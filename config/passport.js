// config/passport.js

var passport = require('passport');
var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;


passport.use('user',new LocalStrategy(
  function(username, password, done){

    var User = mongoose.model('User');

    User.findOne({ username: username },function(err,user){
      if(err)
        return done(err);

      // if user is not found or password is incorrect
      if(!user || !user.checkPassword(password))
        return done(null, false,{
          message: 'Invalid Credentials'
        });

      // if credentials are correct
      return done(null, user);
    });
  }
));
