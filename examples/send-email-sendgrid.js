// SendGrid example (install: npm i @sendgrid/mail)
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(to, subject, html) {
  const msg = {
    to,
    from: process.env.EMAIL_FROM,
    subject,
    html,
  };
  return sgMail.send(msg);
}

module.exports = { sendEmail };
