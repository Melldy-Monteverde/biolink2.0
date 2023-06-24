const { Router } = require('express'),
  router = Router()

router.get('/api', (req, res) => {
  res.json({
    ok: true,
    status: 200,
    message: 'Hello there!'
  })
})

module.exports = router
