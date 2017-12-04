var express = require('express')
var router  = express.Router()
var mysql   = require('mysql')

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

router.get('/login', (req, res) => {
  let username = req.body.name
  let password = req.body.password
  let sql = `SELECT * FROM user WHERE user.name='${username}' and user.password='${password}'`
  db.query(sql, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})
router.post('/sign-up', (req, res) => {
  let sql = 'INSERT INTO user SET ?'
  db.query(sql, req.body, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send('User created')
  })
})
module.exports = router
