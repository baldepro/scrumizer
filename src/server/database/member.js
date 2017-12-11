const mysql = require('mysql')
const dbSettings = require('./settings')
const dbQuery = require('./dbQuery')
const httpMsgs = require('./httpMsgs')

const connection = mysql.createConnection(dbSettings.dbConfig)

exports.getMembers = function (request, response, body) {
  if (!body.projectId) throw new Error('Input Not Valid')
  connection.query(dbQuery.member.getAll(body), (error, results, fields) => {
    if (error) throw new Error('Request Not Valid')
    httpMsgs.sendData(response, results)
  })
}

exports.add = function (request, response, body) {
  if (!body.username && !body.userRole && !body.projectId) throw new Error('Input Not Valid')
  connection.query(dbQuery.member.add(body), (error, results, fields) => {
    if (error) throw new Error('Request Not Valid')
    httpMsgs.send200(response)
  })
}

exports.update = function (request, response, body) {
  try {
    if (!body.username && !body.projectId) throw new Error('Input Not Valid')
    connection.query(dbQuery.member.update(body), (error, results, fields) => {
      if (error) throw new Error('Request Not Valid')
      httpMsgs.send200(response)
    })
  } catch (error) {
    throw new Error(error)
  }
}

exports.delete = function (request, response, body) {
  if (!body.username && !body.projectId) throw new Error('Input Not Valid')
  connection.query(dbQuery.member.delete(body.id), (error, results, fields) => {
    if (error) throw new Error('Request Not Valid')
    httpMsgs.send200(response)
  })
}
