var express = require('express')
var app = express()
var path = require('path')
var routes = require('./src/server/routes')

var PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'public')))

routes(app)

app.all('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(PORT, function () {
  console.log('server is running on port ' + PORT)
})
