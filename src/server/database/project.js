const mysql = require('mysql')
const dbSettings = require('./settings')
const dbQuery = require('./dbQuery')
const httpMsgs = require('./httpMsgs')
const jwt = require('jsonwebtoken')

const connection = mysql.createConnection(dbSettings.dbConfig)

exports.get = function (request, response, body) {
  if (!body.name) throw new Error('Input Not Valid')
  connection.query(dbQuery.project.get(body), (error, results, fields) => {
    if (error) throw new Error('Request Not Valid')
    httpMsgs.sendData(response, results)
  })
}

exports.add = function (request, response, body) {
  if (!body.name && !body.gitUrl && !body.description && !body.creatorId) throw new Error('Input Not Valid')

  connection.query(dbQuery.project.add(body), (error, results, fields) => {
    if (error) throw new Error('Request Not Valid')
    httpMsgs.send200(response)
  })
}

exports.update = function (request, response, body) {
  try {
    if (!body.name) throw new Error('Input Not Valid')

    connection.query(dbQuery.updateUser(body), (error, results, fields) => {
      if (error) throw new Error('Request Not Valid')
      httpMsgs.send200(response)
    })
  } catch (error) {
    throw new Error(error)
  }
}

exports.delete = function (request, response, body) {
  try {
    if (!body.name) throw new Error('Input Not Valid')

    connection.query(dbQuery.deleteUser(body), (error, results, fields) => {
      if (error) throw new Error('Request Not Valid')
      httpMsgs.send200(response)
    })
  } catch (error) {

  }
}

function generateToken (results) {
  return jwt.sign(
    { name: results[0].name, email: results[0].email },
    dbSettings.SECRET,
    {expiresIn: '24h'}
  )
}
