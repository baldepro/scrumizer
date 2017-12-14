const mysql = require('mysql')
const dbSettings = require('./settings')
const dbQuery = require('./dbQuery')
const httpMsgs = require('./httpMsgs')

const connection = mysql.createConnection(dbSettings.dbConfig)

exports.get = function (request, response, body) {
  if (!body.sprintId) throw new Error('Input Not Valid')
  connection.query(dbQuery.task.get(body), (error, results, fields) => {
    if (error) throw new Error('Request Not Valid')
    httpMsgs.sendData(response, results)
  })
}

exports.add = function (request, response, body) {
  if (!body.description && !body.status && !body.developerId && !body.sprintId)
    throw new Error('Input Not Valid')
  connection.query(dbQuery.task.add(body), (error, results, fields) => {
    if (error) throw new Error('Request Not Valid')
    httpMsgs.sendData(response, results)
  })
}

exports.update = function (request, response, body) {
  try {
    if (!body.id) throw new Error('Input Not Valid')
    connection.query(dbQuery.task.update(body), (error, results, fields) => {
      if (error) throw new Error('Request Not Valid')
      httpMsgs.send200(response)
    })
  } catch (error) {
    throw new Error(error)
  }
}

exports.delete = function (request, response, body) {
  if (!body.id) throw new Error('Input Not Valid')
  connection.query(dbQuery.task.delete(body.id), (error, results, fields) => {
    if (error) throw new Error('Request Not Valid')
    httpMsgs.send200(response)
  })
}
