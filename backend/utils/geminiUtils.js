const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

async function generateMessage(name, gender, occasion) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Generate a short, romantic ${occasion} message for ${gender === 'female' ? 'a woman' : 'a man'} named ${name}. 
    
Requirements:
- Keep it to 2-3 sentences max
- Make it romantic and heartfelt
- Personalize it with their name
- Suitable for a love card
- No emojis or special characters that might break formatting

Just provide the message text, nothing else.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const message = response.text();
    
    return message.trim();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate message');
  }
}

module.exports = {
  generateMessage
};
