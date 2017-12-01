/** -------------------------------------------------------------
 *    Routes for user stories
 *------------------------------------------------------------ */

 var express = require('express')
 var router = express.Router()
 var mysql = require('mysql')
 var db = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'scrumdb'
 })

 db.connect((error) => {
   if (error) {
     console.log('Error for connection to data base')
   } else {
     console.log('Connection established with the database in sprint root')
   }
 })
 router.get('/:project_id', (req, res) => {
   let id = req.params.project_id
   let sql = `SELECT * FROM sprint WHERE sprint.project_id='${id}'`
   db.query(sql, (err, result) => {
     if (err) throw err
     res.send(result)
   })
 })
 router.post('/create', (req, res) => {
   let projectId = req.body.project_id
   let start_time = req.body.start_time
   let end_time = req.body.end_time
   let sql = 'INSERT INTO sprint SET ?'
   db.query(sql, req.body, (err, result) => {
     if (err) console.log(err)
     res.send('us created')
   })
 })
 router.post('/delete', (req, res) => {
   let sprintId = req.body.id
   let sql = `DELETE FROM sprint WHERE sprint.id='${sprintId}'`
   db.query(sql, req.body, (err, result) => {
     if (err) throw err
     res.send(result)
   })
 })
 router.post('/update', (req, res) => {
   let id = req.body.id
   let start_time = req.body.start_time
   let end_time = req.body.end_time
   let ProjectId = req.body.project_id
   let sql = `UPDATE sprint SET sprint.start_time='${start_time}', sprint.end_time='${end_time}' WHERE sprint.id='${id}'`
   db.query(sql, req.body, (err, result) => {
     if (err) throw err
     res.send(result)
   })
 })
module.exports = router
