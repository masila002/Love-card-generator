const sharp = require('sharp');
const path = require('path');

// Card-specific configurations
const cardConfig = {
  valentine: {
    width: 1748,
    height: 1240,
    margin: 150,
    fontSize: 72,
    maxCharsPerLine: 40
  },
  birthday: {
    width: 1080,
    height: 1080,
    margin: 150,
    fontSize: 64,
    maxCharsPerLine: 30
  },
  anniversary: {
    width: 1581,
    height: 2245,
    margin: 150,
    fontSize: 76,
    maxCharsPerLine: 35
  }
};

// Detect if image is light or dark based on average brightness
async function detectImageBrightness(cardPath, occasion) {
  try {
    const image = sharp(cardPath);
    const { data, info } = await image
      .raw()
      .toBuffer({ resolveWithObject: true });

    let totalBrightness = 0;
    let pixelCount = 0;

    // Sample every 10th pixel for performance
    for (let i = 0; i < data.length; i += info.channels * 10) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      // Calculate brightness using luminance formula
      const brightness = (0.299 * r + 0.587 * g + 0.114 * b);
      totalBrightness += brightness;
      pixelCount++;
    }

    const averageBrightness = totalBrightness / pixelCount;

    // Logic:
    // If Dark Image (avg < 128):
    //   - Anniversary -> Gold
    //   - Others -> White
    // If Light Image (avg >= 128):
    //   - Valentine -> Red
    //   - Others -> Black

    if (averageBrightness < 128) {
      // Dark background
      return occasion === 'anniversary' ? '#FFD700' : '#FFFFFF';
    } else {
      // Light background
      return occasion === 'valentine' ? '#D32F2F' : '#000000';
    }
  } catch (error) {
    console.error('Brightness detection error:', error);
    // Default to white if detection fails
    return '#FFFFFF';
  }
}

// Helper function to wrap text into multiple lines
function wrapText(text, maxCharsPerLine = 40) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach(word => {
    if ((currentLine + word).length > maxCharsPerLine) {
      if (currentLine) lines.push(currentLine.trim());
      currentLine = word;
    } else {
      currentLine += (currentLine ? ' ' : '') + word;
    }
  });

  if (currentLine) lines.push(currentLine.trim());
  return lines;
}

async function addMessageToCard(cardPath, message, preferredColor = 'auto', occasion = 'valentine', recipientName = '') {
  try {
    const image = sharp(cardPath);
    const metadata = await image.metadata();

    // Get card config or use defaults
    const config = cardConfig[occasion] || cardConfig.valentine;
    const textColor = preferredColor === 'auto' ? await detectImageBrightness(cardPath, occasion) : preferredColor;

    // Calculate text area (with config.margin on all sides)
    const textAreaWidth = metadata.width - (config.margin * 2);
    const textAreaHeight = metadata.height - (config.margin * 2);
    const textAreaStartX = config.margin;
    const textAreaStartY = config.margin;

    // Wrap text based on card type
    const lines = wrapText(message, config.maxCharsPerLine);
    const lineHeight = config.fontSize + 15;

    // Name styling
    const nameFontSize = Math.round(config.fontSize * 1.5);
    const nameLineHeight = nameFontSize + 20;

    // Calculate total height of the text block
    let totalTextHeight = lines.length * lineHeight;
    if (recipientName) {
      totalTextHeight += nameLineHeight; // Add height for name line
    }

    // Position text in the Middle of the textual area
    let startY = textAreaStartY + (textAreaHeight - totalTextHeight) / 2;

    // Adjust if text is too tall
    if (startY < textAreaStartY) {
      startY = textAreaStartY;
    }

    let svgContent = '';

    // Add Name if exists
    if (recipientName) {
      svgContent += `<tspan x="${metadata.width / 2}" dy="0" font-size="${nameFontSize}">Dear ${escapeXml(recipientName)},</tspan>`;
      // First line of message needs to be pushed down
      svgContent += `\n<tspan x="${metadata.width / 2}" dy="${nameLineHeight}" font-size="${config.fontSize}">${escapeXml(lines[0])}</tspan>`;

      // Remaining lines
      for (let i = 1; i < lines.length; i++) {
        svgContent += `\n<tspan x="${metadata.width / 2}" dy="${lineHeight}">${escapeXml(lines[i])}</tspan>`;
      }
    } else {
      // Just message
      svgContent = lines
        .map((line, index) => {
          return `<tspan x="${metadata.width / 2}" dy="${index === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`;
        })
        .join('\n');
    }

    const svgText = `
      <svg width="${metadata.width}" height="${metadata.height}">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="4" flood-opacity="0.7"/>
          </filter>
        </defs>
        <text 
          x="${metadata.width / 2}" 
          y="${startY}" 
          font-family="Great Vibes, cursive" 
          font-size="${config.fontSize}" 
          font-weight="normal"
          fill="${textColor}" 
          text-anchor="middle"
          dominant-baseline="hanging"
          filter="url(#shadow)"
          line-spacing="1.4"
          letter-spacing="1"
        >
          ${svgContent}
        </text>
      </svg>
    `;

    const processedImageBuffer = await image
      .composite([
        {
          input: Buffer.from(svgText),
          top: 0,
          left: 0
        }
      ])
      .png()
      .toBuffer();

    return processedImageBuffer;
  } catch (error) {
    console.error('Image processing error:', error);
    throw new Error('Failed to add message to card');
  }
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

module.exports = {
  addMessageToCard
};
