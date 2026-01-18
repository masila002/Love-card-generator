const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { getRandomCard, getAllCards, OCCASIONS } = require('../utils/cardUtils');
const { getRandomMessage } = require('../utils/predefinedMessages');
const { addMessageToCard } = require('../utils/imageUtils');
const { getFromCache, saveToCache, clearCache, getCacheStats } = require('../utils/messageCache');

// Generate card (free tier - random card)
router.post('/generate-card', async (req, res) => {
  try {
    const { name, gender, occasion, textColor } = req.body;

    // Validate input
    if (!name || !gender || !occasion) {
      return res.status(400).json({ error: 'Missing required fields: name, gender, occasion' });
    }

    if (!OCCASIONS.includes(occasion)) {
      return res.status(400).json({ error: `Invalid occasion. Available: ${OCCASIONS.join(', ')}` });
    }

    if (!['male', 'female'].includes(gender)) {
      return res.status(400).json({ error: 'Gender must be "male" or "female"' });
    }

    // Get random card
    const cardPath = getRandomCard(occasion);

    // Get random predefined message (instant, no API call!)
    const message = getRandomMessage(occasion, gender);

    // Add message to card
    try {
      const imageBuffer = await addMessageToCard(cardPath, message, textColor, occasion, name);
      const base64Image = `data:image/png;base64,${imageBuffer.toString('base64')}`;

      console.log(`✓ Card generated in memory`);

      // Return content directly
      res.json({
        success: true,
        message: message,
        imageBase64: base64Image
      });
    } catch (imageError) {
      console.error('Image processing error:', imageError);
      throw new Error(`Failed to add message to card: ${imageError.message}`);
    }

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all occasions
router.get('/occasions', (req, res) => {
  res.json({ occasions: OCCASIONS });
});

// Get all cards for an occasion (premium feature - placeholder)
router.get('/cards/:occasion', (req, res) => {
  try {
    const { occasion } = req.params;

    if (!OCCASIONS.includes(occasion)) {
      return res.status(400).json({ error: `Invalid occasion. Available: ${OCCASIONS.join(', ')}` });
    }

    const cards = getAllCards(occasion);
    res.json({ cards: cards.map(c => ({ name: c.name })) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



// Cache stats
router.get('/cache-stats', (req, res) => {
  const stats = getCacheStats();
  res.json({
    cached_messages: stats.size,
    message: `${stats.size} messages cached to save API quota`
  });
});

// Clear cache (admin)
router.post('/clear-cache', (req, res) => {
  clearCache();
  res.json({ message: 'Cache cleared' });
});

module.exports = router;
