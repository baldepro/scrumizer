var express = require('express')
var router = express.Router()
const project = require('../database/project')

router.get('/get/:name:creator_id', (request, response) => {
  project.get(request, response, request.params)
})

router.post('/add', (request, response) => {
  project.add(request, response, request.body)
})

router.put('/', (req, res) => {

})

router.delete('/', (req, res) => {

})

module.exports = router
