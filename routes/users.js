const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// GET user list
router.get('/', userController.user_list);

// POST sign up user
router.post('/signup', userController.signup);

// POST login user
router.post('/login', userController.login);

// GET logout user
router.get('/logout', userController.logout);

// GET user summary
router.get('/:id', userController.user_index);


module.exports = router;
