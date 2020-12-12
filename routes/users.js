var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// GET fields to sign up user 
router.get('/signup', userController.signup_get);

// POST sign up user
router.post('/signup', userController.signup_post);

// GET fields to login user
router.get('/login', userController.login_get);

// POST login user
router.post('/login', userController.login_post);

// GET logout user
router.get('/logout', userController.logout);

// GET user summary
router.get('/user/:id', userController.user_index);

// GET total number of users
router.get('/users_count', userController.users_count)


module.exports = router;
