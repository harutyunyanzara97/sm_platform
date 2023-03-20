const { google } = require("googleapis");
const nodemailer = require("nodemailer");

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

class MailService {
  mailer = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_ADDRESS,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      accessToken: process.env.GOOGLE_ACCESS_TOKEN,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: oauth2Client.getAccessToken(),
    },
  });

  sendMail(email, subject, purpose) {
    this.mailer
      .sendMail({
        from: `"SM-platform" <${process.env.EMAIL_ADDRESS}>`,
        to: email,
        subject: subject,
        html: `<p>${purpose}</p>`,
      })
      .then((sent) => {})
      .catch((err) => {
        throw err;
      });
  }
};

module.exports = MailService;