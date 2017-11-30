var express           = require('express');
var router            = express.Router();
const {Customer}      = require('mysql');
const path            = require('path');
const connexionString = process.en.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/scrum';

router.post('/user', function(req, res){
  var results   = {};
  var newUser   = [req.params.name, req.params.email];
  var customer  = new Customer({connexionString:connexionString});
  customer.connect();
  customer.query('call create_user(?, ?)', newUser, function(error, result){
    if (error) {
      throw error;
    }
    else {
      results.push(result);
    }
    customer.end();
  });
  return res.json(results);
});
router.get('/user/:id', function(req, res){
  var results   = {};
  var user_id   = [req.param.id];
  var customer  = new Customer({connexionString:connexionString});
  customer.connect();
  customer.query('call get_user(?)', user_id, function(error, result){
    if (error) {
      throw error;
    }
    else {
      results.push(result);
    }
    customer.end();
  });
  return res.json(results);
});
router.put('/user/:id', function(req, res){
  var results   = {};
  var user_info = [req.params.id, req.body.params.name, req.body.params.email];
  var customer  = new Customer({connexionString:connexionString});
  customer.connect();
  customer.query('call update_user(?, ?, ?)', user_info, function(error, result){
    if (error) {
      throw error;
    }
    else {
      results.push(result);
    }
    customer.end();
  });
  return res.json(results);
});
module.exports = router;
