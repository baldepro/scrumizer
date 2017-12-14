var express = require('express')
var router = express.Router()
const task = require('../database/task')

router.get('/', (request, response) => {
  task.get(request, response, request.query)
})

router.post('/', (request, response) => {
  task.add(request, response, request.body)
})

router.put('/', (request, response) => {
  task.update(request, response, request.body)
})

router.delete('/', (request, response) => {
  task.delete(request, response, request.query)
})

module.exports = router
