var express       = require('express');
var path          = require('path');
var router        = express.Router();
var client        = require('mysql');
var connexion     = client.createConnection({
                    host: "",
                    user: "",
                    password: "",
                    database: ""
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname,'..','views','index.html'));
});
router.post('/project', function(req, res, next) {
  const results = [];
  connexion.connect(function(error){
    if(error) throw err;
    connexion.query(sql, function(error, result){
      if(error) throw error;
      results.push(result);
    });
  });
  return results;
});
router.post('/user', function(req, res, next) {
  const results = [];
  connexion.connect(function(error){
    if(error) throw err;
    connexion.query(sql, function(error, result){
      if(error) throw error;
      results.push(result);
    });
  });
  return results;
});
router.post('/userStory', function(req, res, next) {
  const results = [];
  connexion.connect(function(error){
    if(error) throw err;
    connexion.query(sql, function(error, result){
      if(error) throw error;
      results.push(result);
    });
  });
  return results;
});

module.exports = router;
