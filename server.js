const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const Routes = require('./src/server/routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var PORT = process.env.PORT || 3000
app.use(express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

Routes(app)

// app.use('/sprint', sprintRoutes)

app.listen(PORT, function () {
  console.log('server is running on port ' + PORT)
})
