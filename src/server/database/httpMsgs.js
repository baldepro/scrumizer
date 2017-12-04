const STATUS_200 = 200
const STATUS_401 = 401
const STATUS_404 = 404
const STATUS_405 = 405
const STATUS_413 = 413
const STATUS_500 = 500
const STATUS_504 = 504

exports.sendToken = function (response, info, data) {
  response.writeHead(STATUS_200, {'Content-Type': 'application/json'})
  if (data) {
    response.write(JSON.stringify({success: true, message: 'User Authentificated', info: info, token: data}))
  }
  response.end()
}

exports.sendData = function (response, data) {
  response.writeHead(STATUS_200, {'Content-Type': 'application/json'})
  if (data) {
    let jsonData = JSON.stringify({success: true, data: data})
    response.write(jsonData, (error) => {
      if (error) throw new Error('Query error ' + error)
      response.end()
    })
  }
}

exports.send500 = function (response, error) {
  response.writeHead(STATUS_500, 'Internal Error Occured', {'Content-Type': 'application/json'})
  response.write(JSON.stringify({success: false, message: 'ERROR Occured: ' + error}))
  response.end()
}

exports.send504 = function (response, error) {
  response.writeHead(STATUS_504, 'Duplicate Entry', {'Content-Type': 'application/json'})
  response.write(JSON.stringify({success: false, message: error}))
  response.end()
}

exports.send200 = function (response) {
  response.writeHead(STATUS_200, {'Content-Type': 'application/json'})
  response.write(JSON.stringify({success: true, message: 'Resquest successfuly executed'}))
  response.end()
}

exports.send405 = function (response) {
  response.writeHead(STATUS_405, 'Method Not Supported', {'Content-Type': 'application/json'})
  response.write(JSON.stringify({success: false, message: 'Method Not Supported'}))
  response.end()
}

exports.send404 = function (response) {
  response.writeHead(STATUS_404, 'Resource Not Found', {'Content-Type': 'application/json'})
  response.write(JSON.stringify({success: false, message: 'Resource Not Found'}))
  response.end()
}
exports.send401 = function (response) {
  response.writeHead(STATUS_401, 'Authentification Failed', {'Content-Type': 'application/json'})
  response.write(JSON.stringify({success: false, message: 'Authentification Failed'}))
  response.end()
}

exports.send413 = function (response) {
  response.writeHead(STATUS_413, 'Request Entity Too Large', {'Content-Type': 'application/json'})
  response.write(JSON.stringify({message: 'Request Entity Too Large'}))
  response.end()
}
