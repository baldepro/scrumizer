var express = require('express')
var app = express()
var path = require('path')
var router = express.Router()
// var routes = require('./src/server/routes')
var mysql = require('mysql')
var bodyParser = require('body-parser')

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

var PORT = process.env.PORT || 3000

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'test',
  database: 'scrumdb'
})

db.connect((error) => {
  if (error) {
    console.log('Error for connection to data base')
  } else {
    console.log('Connection established with the database')
  }
})

app.use(express.static(path.join(__dirname, 'public')))

/** -------------------------------------------------------------
 *    Routes for home page
 *------------------------------------------------------------ */
app.use('/home', router)

router.post('/login', (req, res) => {
  let username = req.body.name
  let sql = `SELECT * FROM user WHERE user.name='${username}'`
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

/** -------------------------------------------------------------
 *    Routes for project page
 *------------------------------------------------------------ */
app.use('/project', router)
router.get('/', (req, res) => {
  let sql = 'SELECT * FROM project'
  db.query(sql, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send(result)
  })
})
router.post('/create', (req, res) => {
  let sql = 'INSERT INTO project SET ?'
  db.query(sql, req.body, (err, result) => {
    if (err) throw err
    console.log(result)
    res.send('Project created')
  })
})
router.post('/delete', (req, res) => {
  let projectName = req.body.name
  let sql = `DELETE FROM project WHERE project.name='${projectName}'`
  db.query(sql, req.body, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})
router.post('/update', (req, res) => {
  let projectName = req.body.name
  let projectDesc = req.body.description
  let projectGit = req.body.git_url

  let sql = `UPDATE project SET project.name='${projectName}', project.description='${projectDesc}' WHERE project.git_url='${projectGit}'`
  db.query(sql, req.body, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})

app.all('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(PORT, function () {
  console.log('server is running on port ' + PORT)
})
