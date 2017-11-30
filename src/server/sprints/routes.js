/** -------------------------------------------------------------
 *    Routes for user stories
 *------------------------------------------------------------ */
/*
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
     console.log('Connection established with the database')
   }
 })
 router.get('/:project_id', (req, res) => {
   let id = req.params.project_id
   let sql = `SELECT * FROM user_story WHERE user_story.project_id='${id}'`
   db.query(sql, (err, result) => {
     if (err) throw err
     res.send(result)
   })
 })
 router.post('/create', (req, res) => {
   let usId = req.body.project_id
   let desc = req.body.description
   let priority = req.body.priority
   let points = req.body.points
   let status = req.body.status
   let pId = req.body.project_id
   let sql = 'INSERT INTO user_story SET ?'
   db.query(sql, req.body, (err, result) => {
     if (err) console.log(err)
     res.send('us created')
   })
 })
 router.post('/delete', (req, res) => {
   let usId = req.body.id
   console.log(usId)
   let sql = `DELETE FROM user_story WHERE user_story.id='${usId}'`
   db.query(sql, req.body, (err, result) => {
     if (err) throw err
     res.send(result)
   })
 })
 router.post('/update', (req, res) => {
   let id = req.body.id
   let usDesc = req.body.description
   let usPriority = req.body.priority
   let usPoints = req.body.points
   let usStatus = req.body.status
   let usProjectId = req.body.project_id
   console.log('des' + usDesc)
   let sql = `UPDATE user_story SET user_story.description='${usDesc}', user_story.priority='${usPriority}' , user_story.points='${usPoints}', user_story.status='${usStatus}' WHERE user_story.id='${id}'`
   db.query(sql, req.body, (err, result) => {
     if (err) throw err
     res.send(result)
   })
 })
module.exports = router
*/
