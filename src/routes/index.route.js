require('dotenv').config()
const { Router } = require('express'),
  nodemailer = require('nodemailer'),
  nodemailerSendgrid = require('nodemailer-sendgrid'),
  router = Router()

// INFO: for testing mailtrap SMTP
const createTransport = () => {
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

// INFO: for testing at ethereal SMTP
const createTransTest = () => {
  let transport = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'humberto.volkman@ethereal.email',
      pass: 'tn6cm27m8JM74Y1ytV'
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
const createTransportSendgrid = () => {
  const transport = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SENDGRID_API_KEY
    })
  )

  return transport
}

router.post('/contact', (req, res) => {
  const { name, email, comment } = req.body
  console.log(req.body)

  let message = {
    from: email,
    to: process.env.EMAIL_TO,
    cc: email,
    subject: 'New message from the web!',
    html: `
        <h1>Hello there</h1>
        <p>Someone wants to contact you from the web</p>
        <p>Here is the contact details:</p>
          <ul>
              <li>User name: ${name}</li>
              <li>User email: ${email}</li>
          </ul>
          <p>User comment: ${comment}</p>
        `
  }

  const sendMail = async () => {
    // INFO: descoment for ethereal
    // const transporter = createTransTest()

    // INFO: descoment for mailtrap
    // const transporter = createTransport()

    // INFO: descoment for google
    const transporter = createTransportGmail()

    // INFO: descoment for google
    // const transporter = createTransportSendgrid()

    const info = await transporter.sendMail(message)
    console.log(info)
    console.log('Message sent: %s', info.messageId)
    return
  }

  sendMail()

  console.log(message)
  res.send('Message was sent!')

  // FIX: redirect doen't work ok!
  // res.redirect('/')
})

module.exports = router
