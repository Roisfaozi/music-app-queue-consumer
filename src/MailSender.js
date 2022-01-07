const nodemailer = require('nodemailer')

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    })
  }
  sendEmail(targetEmail, playlistName, playlistUser, content) {
    const message = {
      from: 'Music Apps',
      to: targetEmail,
      subject: `LAGU-LAGU KECE DI PLAYLIST  ${playlistName}`,
      text: `Hai ${playlistUser} !, 
      Berikut adalah lagu-lagu yang kamu minta dari playlist ${playlistName}`,
      attachments: [
        {
          filename: `${playlistName}.json`,
          content,
        },
      ],
    }

    return this._transporter.sendMail(message)
  }
}

module.exports = MailSender
