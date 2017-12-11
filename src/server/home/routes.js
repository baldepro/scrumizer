const express = require('express')
const router = express.Router()
const user = require('../database/user')

router.get('/', (request, response) => {
  user.getUsers(request, response)
})

router.post('/signup', (request, response) => {
  user.add(request, response, request.body)
})

router.post('/login', (request, response) => {
  user.get(request, response, request.body)
})

router.delete('/', (request, response) => {
  user.delete(request, response, request.body)
})

module.exports = router
