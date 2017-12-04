const mysql = require('mysql')
const dbSettings = require('./settings')
const dbQuery = require('./dbQuery')
const httpMsgs = require('./httpMsgs')

const connection = mysql.createConnection(dbSettings.dbConfig)

exports.get = function (request, response, body) {
  if (!body.ownerName) throw new Error('Input Not Valid')
  connection.query(dbQuery.project.get(body), (error, results, fields) => {
    if (error) throw new Error('Request Not Valid')
    httpMsgs.sendData(response, results)
  })
}

exports.add = function (request, response, body) {
  if (!body.name && !body.git && !body.description && !body.ownerName) throw new Error('Input Not Valid')
  connection.query(dbQuery.project.add(body), (error, results, fields) => {
    if (error) throw new Error('Request Not Valid')
    httpMsgs.send200(response)
  })
}

exports.update = function (request, response, body) {
  try {
    if (!body.id) throw new Error('Input Not Valid')

    connection.query(dbQuery.project.update(body), (error, results, fields) => {
      if (error) throw new Error('Request Not Valid')
      httpMsgs.send200(response)
    })
  } catch (error) {
    throw new Error(error)
  }
}

exports.delete = function (request, response, body) {
  console.log(body.id)
  if (!body.id) throw new Error('Input Not Valid')

  connection.query(dbQuery.project.delete(body.id), (error, results, fields) => {
    if (error) throw new Error('Request Not Valid')
    httpMsgs.send200(response)
  })
}
