const express = require('express')
const router = express.Router()
const member = require('../database/member')

router.get('/', (request, response) => {
  member.getMembers(request, response, request.query)
})

router.post('/', (request, response) => {
  member.add(request, response, request.body)
})

router.put('/', (request, response) => {

})

router.delete('/', (request, response) => {
  member.delete(request, response, request.query)
})

module.exports = router
