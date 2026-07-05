// examples/otp-sms.js
// Usage: node otp-sms.js +1234567890
// npm i twilio

const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

function genCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOtp(to) {
  const code = genCode();
  // store code in DB/cache with expiry (not implemented here)
  const msg = await client.messages.create({
    body: `Your Virasphere verification code: ${code}`,
    from: process.env.TWILIO_FROM_NUMBER,
    to,
  });
  console.log('Sent', msg.sid, 'code', code);
}

if (require.main === module) {
  const to = process.argv[2];
  if (!to) { console.error('Usage: node otp-sms.js <to>'); process.exit(1); }
  sendOtp(to).catch(console.error);
}

module.exports = { sendOtp };
