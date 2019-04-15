// app/controllers/account.js

var mongoose = require('mongoose');

var Account = mongoose.model("Account");


/**
show complete list of all account
**/
exports.list = function(req,res){
	console.log("hello");
	if(!req.user._id)
		return res.status(401).json({"message":"UnauthorizedError"});

	Account.find().sort(req.params.sort).exec(function(err,models){
		if(err){
			console.log(err);
			return res.status(400);
		} else{
			return res.status(200).json(models);
			}
	});
};

/**
show list of all account that satisfy a particular query_list
**/
exports.query_list = function(req,res){
	if(!req.user._id)
		return res.status(401).json({"message":"UnauthorizedError"});

	Account.find(req.body).sort(req.params.sort).exec(function(err,models){
		if(err){
			console.log(err);
			return res.status(400);
		}
		res.status(200).json(models);
	});
}

/**
create an account from a post request
**/
exports.create = function(req,res,next){
	if(!req.user._id)
		return res.status(401).json({"message":"UnauthorizedError"});

	Account.create({
      holder: req.body.holder,
      type  : req.body.type
    },function(err, model){
      if(err)
        return next(err);

      // now return all accounts after you have added a new one in json format
     Account.find().exec(function(err,Account){
        if(err)
          return next(err);

        res.json(Account);
      });
    });
}


/**
delete an account
**/
exports.delete = function(req,res,next){
	if(!req.user._id)
		return res.status(401).json({"message":"UnauthorizedError"});

	// delete the accound by id
	Account.remove({
    _id:  req.params.account_id
  },function(err, account){
    if(err)
      return next(err);

    // get and return all accounts after you have delete one
    Account.find(function(err, account){
      if(err)
        return next(err);

      res.json(account);
    });
  });
}


/**
* read an account using id
**/
exports.read = function(req,res,next){
	if(!req.user._id)
		return res.status(401).json({"message":"UnauthorizedError"});

	Account.findById(req.params.account_id).exec(function(err,account){
		if(err)
			return next(err);
		// if no account available with this id, show error 404
		if(!account)
			return res.status(404);
		res.json(account);
	});
}

/**
* update an account
**/
exports.update = function(req,res,next){
	if(!req.user._id)
		return res.status(401).json({"message":"UnauthorizedError"});

	var account = req.account;
	account = _.extend(account,req.body);
	account.save(function(err){
		if(err)
			return res.status(400);
		res.json(account);
	});
}
