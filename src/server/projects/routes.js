/** -------------------------------------------------------------
 *    Routes for project page
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
     console.log('Connection established with the database')
   }
 })

router.get('/', (req, res) => {
  let sql = 'SELECT * FROM project'
  db.query(sql, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})
router.get('/:name', (req, res) => {
  let projectName = req.body.name
  let sql = `SELECT * FROM project WHERE project.name='${projectName}'`
  db.query(sql, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})
router.post('/create', (req, res) => {
  let sql = 'INSERT INTO project SET ?'
  db.query(sql, req.body, (err, result) => {
    if (err) throw err
    res.send('Project created')
  })
})
router.post('/delete', (req, res) => {
  let projectName = req.body.name
  let sql = `DELETE FROM project WHERE project.name='${projectName}'`
  db.query(sql, req.body, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})
router.post('/update', (req, res) => {
  let projectName = req.body.name
  let projectDesc = req.body.description
  let projectGit = req.body.git_url

  let sql = `UPDATE project SET project.name='${projectName}', project.description='${projectDesc}' WHERE project.git_url='${projectGit}'`
  db.query(sql, req.body, (err, result) => {
    if (err) throw err
    res.send(result)
  })
})
module.exports = router
