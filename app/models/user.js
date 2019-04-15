// app/models/user.js

var mongoose = require('mongoose');
var crypto   = require('crypto');
var jwt      = require('jsonwebtoken');
var config   = require('../../config/config');

var UserSchema = new mongoose.Schema({

  username:{
    type: String,
    unique: true,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  contact:{
    phone_number:{
      type: String,
      require: true
    },
    email:{
      type: String
    },
    address:{
      type: String,
      require: true
    }
  },
  role:{
    type: String,
    enum: ['super_admin','admin','manager','employee','customer'],
    default: 'customer'
  },
  hash: String,
  salt: String

});


/**
method to set setPassword
**/
UserSchema.methods.setPassword = function(password){
  // randomly generate a salt
  this.salt = crypto.randomBytes(16).toString('hex');

  // encrypt the password using salt
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');
};


/**
* method to validate setPassword
**/
UserSchema.methods.checkPassword = function(password){
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex');

  return this.hash === hash;
}


/**
* method to generate jsonwebtoken
**/
UserSchema.methods.generateJwt = function(){
  var expiry = new Date();

  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id:  this._id,
    username: this.username,
    name: this.name,
    contact: this.contact,
    role: this.role,
    exp: parseInt(expiry.getTime()/1000)
  }, config.SECRET);
}

module.exports = mongoose.model('User',UserSchema);
