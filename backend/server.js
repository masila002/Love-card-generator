const express = require('express');
const cors = require('cors');
require('dotenv').config();
const cardRoutes = require('./routes/cardRoutes');
const path = require('path');

// Set up fontconfig path for serverless environment
if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
  process.env.FONTCONFIG_PATH = path.join(__dirname, 'fonts');
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Static files for downloaded cards (and frontend for local dev)
app.use(express.static('frontend'));

// Routes
app.use('/api', cardRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
