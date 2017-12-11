const mysql = require('mysql')
const dbSettings = require('./settings')
const dbQuery = require('./dbQuery')
const bcrypt = require('bcrypt')
const httpMsgs = require('./httpMsgs')
const jwt = require('jsonwebtoken')

const connection = mysql.createConnection(dbSettings.dbConfig)

exports.getUsers = function (request, response) {
  connection.query(dbQuery.user.getAll(), (error, results, fields) => {
    if (error) throw new Error('Request Not Valid')
    httpMsgs.sendData(response, results)
  })
}

exports.get = function (request, response, body) {
  if (!body.name && !body.password) throw new Error('Input Not Valid')
  connection.query(dbQuery.user.get(body.name), (error, results, fields) => {
    if (error) throw new Error(error)
    if (results[0] && bcrypt.compareSync(body.password, results[0].password)) {
      httpMsgs.sendToken(response, {name: results[0].name}, generateToken(results))
    } else {
      httpMsgs.send401(response)
    }
  })
}

exports.add = function (request, response, body) {
  if (!body.name && !body.password && !body.email) throw new Error('Input Not Valid')

  body.password = bcrypt.hashSync(body.password, dbSettings.SALT_ROUNDS)

  connection.query(dbQuery.user.add(body), (error, results, fields) => {
    if (error) httpMsgs.send504(response, error)
    httpMsgs.send200(response)
  })
}

exports.update = function (request, response, body) {
  try {
    if (!body.name) throw new Error('Input Not Valid')

    connection.query(dbQuery.user.update(body), (error, results, fields) => {
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

    connection.query(dbQuery.user.delete(body), (error, results, fields) => {
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
