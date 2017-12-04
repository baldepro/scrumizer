var express = require('express')
var app = express()
var path = require('path')
var Routes = require('./src/server/routes')
var bodyParser = require('body-parser')
var PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

Routes(app)

app.listen(PORT, () => {
  console.log('Server is listening at port ' + PORT)
})
