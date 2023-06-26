require('dotenv').config()
const nodemailer = require('nodemailer'),
  nodemailerSendgrid = require('nodemailer-sendgrid')

// INFO: for testing mailtrap SMTP
const createTransportMailtrap = () => {
  let transport = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS
    }
  });
  return transport
}

// INFO: for prod at google SMTP
const createTransportGmail = () => {
  let transport = nodemailer.createTransport({
    host: process.env.GOOGLE_APP_HOST,
    port: process.env.GOOGLE_APP_PORT,
    secure: true,
    auth: {
      user: process.env.GOOGLE_APP_USER,
      pass: process.env.GOOGLE_APP_PASS
    }
  });
  return transport
}

// INFO: for prod with sengrid API
// HACK: add DNS in sengrd for validated each mail sent from the web (need damain and DNS from hosting)
const createTransportSendgrid = () => {
  const transport = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY
    })
  )
  return transport
}

module.exports = {
  createTransportMailtrap,
  createTransportSendgrid,
  createTransportGmail,
}
