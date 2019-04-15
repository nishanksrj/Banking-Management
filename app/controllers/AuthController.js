// app/controllers/AuthController.js

var mongoose = require('mongoose');
var User = mongoose.model("User");
var passport = require('passport');
var atob     = require('atob');

var getUserDetails = function(req){
  var token = req.headers.authorization;
  token = token.split('.')[1];
  var user = atob(token);
  user = JSON.parse(user);
  return user;
}

exports.register = function(req, res, next){
  var log_user = getUserDetails(req);
  var role = ['super_admin','admin','manager','employee','customer'];

  if(req.body.role && role.indexOf(req.body.role)<=role.indexOf(log_user.role))
    return res.status(401).json({message:'You are not authorized to perform this action.'});

  User.findOne({"username":req.body.username}).exec(function(err, user){
    if(err)
      return res.status(400).json({message:err.name});

    if(user){
      return res.status(422).json({message:"Username already exists."});
    }else{
      var user = new User();

      user.name = req.body.name;
      user.username = req.body.username;
      user.contact = {
        'phone_number': req.body.phone_number,
        'email'       : req.body.email,
        'address'     : req.body.address
      };


      user.role = req.body.role;
      user.setPassword(req.body.password);

      user.save(function(err){
        if(err)
          return res.status(400).json({message:err.name});

        var token = user.generateJwt();
        res.status(200).json({
          "token" : token
        });
      });
    }
  });

};


exports.login = function(req, res, next){

  passport.authenticate('user', function(err, user, info){

    if(err)
      return res.status(401).json({message:err.name});

    if(!user)
      res.status(422).json(info);
    else{
      var token  = user.generateJwt();
      res.status(200).json({
        "token" : token
      });
    }
  })(req,res,next);
};


exports.roleAuthorization = function(roles){
  return function(req, res, next){
    var user = getUserDetails(req);

    User.findById(user._id, function(err, user){
      if(err)
        return res.status(422).json({message: "User does not exist."});

      if(roles.indexOf(user.role)>-1)
        return next();
      return res. status(401).json({message: "You are not authorized to perform this action."});
    });
  }
}
