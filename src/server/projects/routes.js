
 var express = require('express')
 var router = express.Router()

 router.get('/', (request, response) => {
   project.get(request, response, request.query)
 })

 router.post('/', (request, response) => {
   project.add(request, response, request.body)
 })

 router.put('/', (request, response) => {
   project.update(request, response, request.body)
 })

 router.delete('/', (request, response) => {
   project.delete(request, response, request.query)
 })

 module.exports = router
