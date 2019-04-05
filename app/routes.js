// app/routes.js
//
var express = require('express');
var mongodb = require('./models/nerd');
var path    = require('path');
var router  = express.Router();

router.get('/',function(req,res){
  res.sendFile('views/index.html',{root:path.join(__dirname,'../public')});
});

module.exports = router;
