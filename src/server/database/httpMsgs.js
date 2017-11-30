const STATUS_200 = 200
const STATUS_401 = 401
const STATUS_404 = 404
const STATUS_405 = 405
const STATUS_413 = 413
const STATUS_500 = 500

exports.sendToken = function (response, data) {
  response.writeHead(STATUS_200, {'Content-Type': 'application/json'})
  if (data) {
    response.write(JSON.stringify({succes: true, message: 'User Authentificated', token: data}))
  }
  response.end()
}

exports.sendData = function (response, data) {
  response.writeHead(STATUS_200, {'Content-Type': 'application/json'})
  if (data) {
    let jsonData = JSON.stringify({data})
    response.write(jsonData, (error) => {
      if (error) throw new Error('Query error ' + error)
      response.end()
    })
  }
}

exports.send500 = function (response, error) {
  response.writeHead(STATUS_500, 'Internal Error Occured', {'Content-Type': 'application/json'})
  response.write(JSON.stringify({message: 'ERROR Occured: ' + error}))
  response.end()
}

exports.send200 = function (response) {
  response.writeHead(STATUS_200, {'Content-Type': 'application/json'})
  response.write(JSON.stringify({message: 'Resquest successfuly executed'}))
  response.end()
}

exports.send405 = function (response) {
  response.writeHead(STATUS_405, 'Method Not Supported', {'Content-Type': 'application/json'})
  response.write(JSON.stringify({message: 'Method Not Supported'}))
  response.end()
}

exports.send404 = function (response) {
  response.writeHead(STATUS_404, 'Resource Not Found', {'Content-Type': 'application/json'})
  response.write(JSON.stringify({message: 'Resource Not Found'}))
  response.end()
}
exports.send401 = function (response) {
  response.writeHead(STATUS_401, 'Authentification Failed', {'Content-Type': 'application/json'})
  response.write(JSON.stringify({message: 'Authentification Failed'}))
  response.end()
}

exports.send413 = function (response) {
  response.writeHead(STATUS_413, 'Request Entity Too Large', {'Content-Type': 'application/json'})
  response.write(JSON.stringify({message: 'Request Entity Too Large'}))
  response.end()
}
