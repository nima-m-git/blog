const express = require('express');
const router = express.router;

const commentController = require('../controllers/commentController');


// GET comment page
router.get('/:id', commentController.get);

// POST create comment
router.post('/', isLoggedIn, commentController.create);

// DELETE comment
router.delete('/:id', isAdmin, commentController.delete);


module.exports = router;