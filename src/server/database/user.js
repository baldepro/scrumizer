const mysql = require('mysql')
const dbSettings = require('./settings')
const dbQuery = require('./dbQuery')
const bcrypt = require('bcrypt')
const httpMsgs = require('./httpMsgs')
const jwt = require('jsonwebtoken')

const connection = mysql.createConnection(dbSettings.dbConfig)

exports.get = function (request, response, body) {
  if (!body.name && !body.password) throw new Error('Input Not Valid')
  connection.query(dbQuery.getUser(body.name), (error, results, fields) => {
    if (error) throw new Error('Request Not Valid')
    if (bcrypt.compareSync(body.password, results[0].password)) {
      httpMsgs.sendToken(response, generateToken(results))
    } else {
      httpMsgs.send401(response)
    }
  })
}

exports.add = function (request, response, body) {
  if (!body.name && !body.password && !body.email) throw new Error('Input Not Valid')

  body.password = bcrypt.hashSync(body.password, dbSettings.SALT_ROUNDS)

  connection.query(dbQuery.addUser(body), (error, results, fields) => {
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
