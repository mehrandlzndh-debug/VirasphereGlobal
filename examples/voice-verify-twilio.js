// examples/voice-verify-twilio.js
// Demonstrates making a verified voice call that speaks the OTP
// npm i twilio

const twilio = require('twilio');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

async function callWithCode(to, code) {
  const twiml = `<Response><Say language="en-US">Your Virasphere verification code is ${code.split('').join(' ')}</Say></Response>`;
  const call = await client.calls.create({
    twiml,
    to,
    from: process.env.TWILIO_FROM_NUMBER,
  });
  return call;
}

if (require.main === module) {
  const to = process.argv[2];
  if (!to) { console.error('Usage: node voice-verify-twilio.js <to>'); process.exit(1); }
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  callWithCode(to, code).then(r => console.log('Call SID', r.sid)).catch(console.error);
}

module.exports = { callWithCode };
