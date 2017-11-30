var express = require('express')
var app = express()
var path = require('path')
var Routes = require('./src/server/routes')
var bodyParser = require('body-parser')
var PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

Routes(app)

app.listen(PORT, () => {
  console.log('Server is listening at port ' + PORT)
})
