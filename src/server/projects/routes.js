var express           = require('express');
var router            = express.Router();
const {Customer}      = require('mysql');
const path            = require('path');
const connexionString = process.en.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/db';

router.post('/project/create', function (req, res) {
  var results     = [];
  var newProject  = [req.body.params.name, req.body.params.description, req.body.params.user_id];
  var customer    = new Customer({connexionString: connexionString});
  customer.connect();
  customer.query('call create_project(?, ?, ?)', newProject, function(error, result){
    if(error){
      throw error;
    }else {
      result.push(result);
    }
    customer.end();
  });
  res.json(results);
});

router.get('/project/list', function (req, res) {
  var results     = [];
  var customer    = new Customer({connexionString: connexionString});
  customer.connect();
  customer.query('call getProjects()',function(error, result){
    if(error){
      throw error;
    }else {
      result.push(result);
    }
    customer.end();
  });
  res.json(results);
});

router.get('/project/:id', function (req, res) {
  var results     = [];
  var projet_id   = [req.params.id];
  var customer    = new Customer({connexionString: connexionString});
  customer.connect();
  customer.query('call getProjectById(?)', projet_id ,function(error, result){
    if(error){
      throw error;
    }else {
      result.push(result);
    }
    customer.end();
  });
  res.json(results);
});

router.put('/project/:id', function (req, res) {
  var results     = [];
  var projet_info   = [req.params.id, req.body.params.name];
  var customer    = new Customer({connexionString: connexionString});
  customer.connect();
  customer.query('call rename_project(?, ?)', projet_info, function(error, result){
    if(error){
      throw error;
    }else {
      result.push(result);
    }
    customer.end();
  });
  res.json(results);
});

router.delete('/project/:id', function (req, res) {
  var results     = [];
  var project_id  = [req.params.id];
  var customer    = new Customer({connexionString: connexionString});
  customer.connect();
  customer.query('call delete_project(?)', project_id, function(error, result){
    if(error){
      throw error;
    }else {
      result.push(result);
    }
    customer.end();
  });
  res.json(results);
});

module.exports = router
