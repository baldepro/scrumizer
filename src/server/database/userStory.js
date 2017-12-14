const mysql = require('mysql')
const dbSettings = require('./settings')
const dbQuery = require('./dbQuery')
const httpMsgs = require('./httpMsgs')

const connection = mysql.createConnection(dbSettings.dbConfig)

exports.get = function (request, response, body) {
  if (!body.projectId) throw new Error('Input Not Valid')
  connection.query(dbQuery.userStory.get(body), (error, results, fields) => {
    if (error) throw new Error('Request Not Valid')
    httpMsgs.sendData(response, results)
  })
}

exports.add = function (request, response, body) {
  try {
    if (body.projectId && body.description && body.priority && body.status && body.points) {
      connection.query(dbQuery.userStory.add(body), (error, results, fields) => {
        if (error) throw new Error('Request Not Valid')
        httpMsgs.send200(response)
      })
    } else {
      throw new Error('Input Invalid')
    }
  } catch (error) {
    console.log(error)
  }
}

exports.update = function (request, response, body) {
  if (!body.id) throw new Error('Input Not Valid')
  connection.query(dbQuery.userStory.update(body), (error, results, fields) => {
    if (error) throw new Error('Request Not Valid')
    httpMsgs.send200(response)
  })
}

exports.delete = function (request, response, body) {
  if (!body.id) throw new Error('Input Not Valid')
  connection.query(dbQuery.userStory.delete(body.id), (error, results, fields) => {
    if (error) throw new Error('Request Not Valid')
    httpMsgs.send200(response)
  })
}
