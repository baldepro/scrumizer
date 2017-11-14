var express = require('express')
var router = express.Router()
const {Customer} = require('mysql')
const connexionString = 'postgresql://postgres:password@localhost:5432/scrum'

router.post('/project/:user_id', function (req, res) {
  var results = []
  var newProject = [req.body.params.name, req.body.params.depot, req.body.params.description, req.params.user_id]
  var customer = new Customer({connexionString: connexionString})
  customer.connect()
  customer.query('call create_project(?, ?, ?)', newProject, function (error, result) {
    if (error) {
      throw error
    } else {
      result.push(result)
    }
    customer.end()
  })
  return res.json(results)
})

router.get('/project/:user_id', function (req, res) {
  var results = []
  var user_id = [req.params.user_id]
  var customer = new Customer({connexionString: connexionString})
  customer.connect()
  customer.query('call get_projects_from_user(?)', user_id, function (error, result) {
    if (error) {
      throw error
    } else {
      result.push(result)
    }
    customer.end()
  })
  return res.json(results)
})

router.get('/project/:user_id', function (req, res) {
  var results = []
  var projet_info = [req.params.user_id, req.body.name]
  var customer = new Customer({connexionString: connexionString})
  customer.connect()
  customer.query('call get_project_from_user(?,?)', projet_info, function (error, result) {
    if (error) {
      throw error
    } else {
      result.push(result)
    }
    customer.end()
  })
  return res.json(results)
})

router.put('/project/:id', function (req, res) {
  var results = []
  var projet_info = [req.params.id, req.body.params.name, req.body.params.depot, req.body.params.desc]
  var customer = new Customer({connexionString: connexionString})
  customer.connect()
  customer.query('call edit_project(?, ?, ?, ?)', projet_info, function (error, result) {
    if (error) {
      throw error
    } else {
      result.push(result)
    }
    customer.end()
  })
  return res.json(results)
})

router.delete('/project/:id', function (req, res) {
  var results = []
  var project_id = [req.params.id]
  var customer = new Customer({connexionString: connexionString})
  customer.connect()
  customer.query('call delete_project(?)', project_id, function (error, result) {
    if (error) {
      throw error
    } else {
      result.push(result)
    }
    customer.end()
  })
  return res.json(results)
})

module.exports = router
