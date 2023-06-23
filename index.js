require('dotenv').config()
const express = require('express'),
  cors = require('cors'),
  nodemailer = require('nodemailer'),
  bodyParser = require('body-parser'),
  PORT = process.env.PORT || 5000,
  app = express()

app.listen(PORT, () => `Server running on PORT: ${PORT}`)
