const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CACHE_DIR = path.join(__dirname, '../cache');

// Ensure cache directory exists
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// Generate cache key from inputs
function generateCacheKey(name, gender, occasion) {
  const input = `${name}:${gender}:${occasion}`;
  return crypto.createHash('md5').update(input).digest('hex');
}

// Get message from cache
function getFromCache(name, gender, occasion) {
  try {
    const cacheKey = generateCacheKey(name, gender, occasion);
    const cachePath = path.join(CACHE_DIR, `${cacheKey}.json`);
    
    if (fs.existsSync(cachePath)) {
      const data = fs.readFileSync(cachePath, 'utf8');
      const cached = JSON.parse(data);
      console.log(`✓ Cache hit for ${name} (${occasion})`);
      return cached.message;
    }
  } catch (error) {
    console.error('Cache read error:', error.message);
  }
  return null;
}

// Save message to cache
function saveToCache(name, gender, occasion, message) {
  try {
    const cacheKey = generateCacheKey(name, gender, occasion);
    const cachePath = path.join(CACHE_DIR, `${cacheKey}.json`);
    
    const data = {
      name,
      gender,
      occasion,
      message,
      createdAt: new Date().toISOString()
    };
    
    fs.writeFileSync(cachePath, JSON.stringify(data, null, 2));
    console.log(`✓ Message cached for ${name}`);
  } catch (error) {
    console.error('Cache write error:', error.message);
  }
}

// Clear all cache
function clearCache() {
  try {
    const files = fs.readdirSync(CACHE_DIR);
    files.forEach(file => {
      fs.unlinkSync(path.join(CACHE_DIR, file));
    });
    console.log('✓ Cache cleared');
  } catch (error) {
    console.error('Cache clear error:', error.message);
  }
}

// Get cache stats
function getCacheStats() {
  try {
    const files = fs.readdirSync(CACHE_DIR);
    return {
      size: files.length,
      files: files
    };
  } catch (error) {
    return { size: 0, files: [] };
  }
}

module.exports = {
  getFromCache,
  saveToCache,
  clearCache,
  getCacheStats
};
