var express = require('express')
var app = express()
var Routes = require('./src/server/routes')

var PORT = process.env.PORT || 3000

Routes(app)

app.all('/*', function (req, res) {
  res.send('\
    <!DOCTYPE html> \
    <html> \
    <head>\
        <title>Scrumizer</title>\
        <base href="">\
    </head>\
    <body>\
        <div ui-view></div>\
        <script src="app.bundle.js"></script>\
        </body>\
        </html>')
})

app.listen(PORT, function () {
  console.log('server is running on port ' + PORT)
})
