const { Router } = require('express'),
  router = Router()

const path = require('path')
const indexHTML = path.join(__dirname, '../public/index.html')
router.get('/', (req, res) => {
  res.sendFile(indexHTML)
})

module.exports = router
