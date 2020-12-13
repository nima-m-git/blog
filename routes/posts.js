const express = require('express');
const router = express.router;

const postController = require('../controllers/postController');


// GET posts index
router.get('/', postController.index);

// GET post page
router.get('/:id', postController.get);

// POST create post
router.post('/', isAdmin, postController.create);

// PUT update post
router.put('/:id', isAdmin, postController.update);

// DELETE post
router.delete('/:id', isAdmin, postController.delete);


module.exports = router;