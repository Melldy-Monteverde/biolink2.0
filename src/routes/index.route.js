require('dotenv').config()
const { Router } = require('express'),
  { createTransportMailtrap, createTransportSendgrid, createTransportGmail } = require('../utils/handlerMailer'),
  router = Router()

const path = require('path')
const sentHTML = path.join(__dirname, '../public/sent.html')

router.post('/contact', (req, res) => {
  const { name, email, comment } = req.body
  console.log(req.body)

  let message = {
    from: `${name} ${email}`,
    to: process.env.EMAIL_TO,
    // cc: email,
    subject: 'New message from the web!',
    html: `
        <h1>Hello there</h1>
        <h3>Someone wants to contact you from the web</h3>
        <p>Here is the contact details:</p>
          <ul>
              <li>User name: ${name}</li>
              <li>User email: ${email}</li>
          </ul>
          <h3>Message:</h3>
          <p>${comment}</p>
        `
  }

  const sendMail = async () => {
    // INFO: descoment for mailtrap
    const transporter = createTransportMailtrap()

    // INFO: descoment for google
    // const transporter = createTransportGmail()

    // INFO: descoment for sendgrid api
    // const transporter = createTransportSendgrid()

    const info = await transporter.sendMail(message)
    console.log(info)
    console.log('Message sent: %s', info.messageId)

    return
  }

  sendMail()
  res.sendFile(sentHTML)
})

module.exports = router
