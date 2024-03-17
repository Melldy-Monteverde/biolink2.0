require('dotenv').config()

const express = require('express'),
  cors = require('cors'),
  path = require('path'),
  PORT = process.env.PORT || 5000,
  app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use(require('./routes/home.router'))
app.use(require('./routes/index.route'))

app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
