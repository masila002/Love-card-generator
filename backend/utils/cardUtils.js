const fs = require('fs');
const path = require('path');

const OCCASIONS = ['valentine', 'birthday', 'anniversary'];

// Get random card for an occasion
function getRandomCard(occasion) {
  const cardDir = path.join(__dirname, '../../images', occasion);
  
  if (!fs.existsSync(cardDir)) {
    throw new Error(`Occasion folder not found: ${occasion}`);
  }
  
  const files = fs.readdirSync(cardDir).filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file)
  );
  
  if (files.length === 0) {
    throw new Error(`No card images found for occasion: ${occasion}`);
  }
  
  const randomCard = files[Math.floor(Math.random() * files.length)];
  return path.join(cardDir, randomCard);
}

// Get all cards for an occasion (for premium feature)
function getAllCards(occasion) {
  const cardDir = path.join(__dirname, '../../images', occasion);
  
  if (!fs.existsSync(cardDir)) {
    throw new Error(`Occasion folder not found: ${occasion}`);
  }
  
  const files = fs.readdirSync(cardDir).filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file)
  );
  
  return files.map(file => ({
    name: file,
    path: path.join(cardDir, file)
  }));
}

module.exports = {
  getRandomCard,
  getAllCards,
  OCCASIONS
};
