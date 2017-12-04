var express = require('express')
var router = express.Router()
var mysql = require('mysql')

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'scrumdb'
})

db.connect((error) => {
  if (error) {
    console.log('Error for connection to data base')
  } else {
    console.log('Connection established with the database')
  }
})

router.put('/', (request, response) => {
  user.update(request, response, request.body)
})

router.delete('/', (request, response) => {
  user.delete(request, response, request.body)
})
module.exports = router
