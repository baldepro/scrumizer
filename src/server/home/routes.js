var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.send('Hello From /home')
})

router.get('/login', function (req, res) {
  res.send({ name: 'toto', password: 'torototo' })
})

router.put('/sign-up', function (req, res) {

})

module.exports = router
