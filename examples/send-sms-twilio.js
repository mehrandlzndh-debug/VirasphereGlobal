// Node.js example (install: npm i twilio)
const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function sendSMS(to, body) {
  return client.messages.create({
    from: process.env.TWILIO_FROM_NUMBER,
    to,
    body,
  });
}

// usage:
// sendSMS('+1xxxxxxxxxx', 'سلام از سیستم شما').then(r => console.log(r.sid));
module.exports = { sendSMS };
