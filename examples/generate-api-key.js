// examples/generate-api-key.js
// Simple API key generator (one-time display). Hash before storing in DB.
const crypto = require('crypto');

function genApiKey() {
  return crypto.randomBytes(32).toString('hex');
}

function hashKey(key) {
  return crypto.createHash('sha256').update(key).digest('hex');
}

if (require.main === module) {
  const key = genApiKey();
  console.log('API Key (copy now, shown once):', key);
  console.log('Hashed (store in DB):', hashKey(key));
}

module.exports = { genApiKey, hashKey };
