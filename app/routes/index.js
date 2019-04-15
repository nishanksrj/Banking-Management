// app/routes/index.js
//
var express = require('express');
var path    = require('path');
var router  = express.Router();
var jwt     = require('express-jwt');
var config  = require('../../config/config.js');

var auth    = jwt({
  secret: config.SECRET
});

require('./AuthRoutes')(router, auth);

require('./account')(router, auth);

router.get('*', auth, function(req,res){
  res.sendFile('index.html',{root:path.join(__dirname,'../../public')});
});


module.exports = router;
