const express = require('express')
const router = express.Router()
const userStory = require('../database/userStory')

router.get('/', (request, response) => {
  userStory.get(request, response, request.query)
})

router.post('/', (request, response) => {
  userStory.add(request, response, request.body)
})

router.put('/', (request, response) => {
  userStory.update(request, response, request.body)
})

router.delete('/', (request, response) => {
  userStory.delete(request, response, request.query)
})

module.exports = router
