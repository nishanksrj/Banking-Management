// app/routes/AuthRoutes.js

var AuthController = require('../controllers/AuthController');

module.exports = function(router, auth){

  router.route('/auth/login')
  .post(AuthController.login);

  router.route('/auth/register')
  .post(AuthController.register);

}
