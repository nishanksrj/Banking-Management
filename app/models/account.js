// app/models.account.js

var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema({
  account_no: {
    type  : String,
    unique  : true,
    required  : true
  },
  holder_id: {
    type : String,
    required : true
  },
  branch_id: {
    type : Number,
    required : true
  },
  balance:{
    type: Number,
    required: true,
    default: 0
  }
});


module.exports = mongoose.model('Account',AccountSchema);
