const express = require('express')
const router = express.Router()
const user = require('../database/user')

router.post('/signup', (request, response) => {
  user.add(request, response, request.body)
})

router.post('/login', (request, response) => {
  user.get(request, response, request.body)
})

router.get('/login', (req, res) => {
  let username = req.body.name
  let password = req.body.password
  let sql = `SELECT * FROM user WHERE user.name='${username}' and user.password='${password}'`
  db.query(sql, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})

router.delete('/', (request, response) => {
  user.delete(request, response, request.body)
})

module.exports = router
