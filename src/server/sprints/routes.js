var express = require('express')
var router = express.Router()
const sprint = require('../database/sprint')

router.get('/', (request, response) => {
  sprint.get(request, response, request.query)
})

router.post('/', (request, response) => {
  sprint.add(request, response, request.body)
})

router.put('/', (request, response) => {
  sprint.update(request, response, request.body)
})

router.delete('/', (request, response) => {
  sprint.delete(request, response, request.query)
})

module.exports = router
