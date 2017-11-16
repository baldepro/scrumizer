var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello From /home')
})

router.get('/login', (req, res) => {
  res.send({ name: 'toto', password: 'torototo' })
})

router.put('/sign-up', (req, res) => {

})

module.exports = router
