var express       = require('express')
var app           = express()
var path          = require('path')
var router        = express.Router()
var usRoutes      =  require('./src/server/user-stories/routes')
var homeRoutes    =  require('./src/server/home/routes')
var projectRoutes =  require('./src/server/projects/routes')
var mysql         = require('mysql')
var bodyParser    = require('body-parser')

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

var PORT = process.env.PORT || 3000

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

app.use(express.static(path.join(__dirname, 'public')))

/** -------------------------------------------------------------
 *   using Routes for home page
 *------------------------------------------------------------ */
app.use('/home', homeRoutes)
/** -------------------------------------------------------------
 *  using  Routes for project page
 *------------------------------------------------------------ */
app.use('/project', projectRoutes)
/** -------------------------------------------------------------
 *  using  Routes for backlog page
 *------------------------------------------------------------ */
app.use('/us', usRoutes)

app.all('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(PORT, function () {
  console.log('server is running on port ' + PORT)
})
module.exports = db
