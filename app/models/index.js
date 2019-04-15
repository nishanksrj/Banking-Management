// app/models/index.js

var mongoose = require('mongoose');

// configuration file
var db = require('../../config/config');

// connect to mongoDB database
mongoose.connect(db.url,{useNewUrlParser : true, useCreateIndex: true});

require('./account');
require('./user');
