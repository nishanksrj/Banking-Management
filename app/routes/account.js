// app/models/employee.js

var AccountController = require('../controllers/AccountController');

module.exports = function(router, auth){

  router.route('/account/:account_id')
  .get(auth, AccountController.read)
  .delete(auth, AccountController.delete);

  router.route('/account')
    .post(auth, AccountController.create);


  router.route('/accounts/list/:sort?')
    .get(auth, AccountController.list)
    .post(auth, AccountController.query_list);

  router.route('/accounts/update')
    .post(auth, AccountController.update);
}
