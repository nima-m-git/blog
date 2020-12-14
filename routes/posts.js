const express = require('express');
const router = express.Router();
const passport = require('passport');

const isAdmin = require('../middleware/isAdmin');

const postController = require('../controllers/postController');


// GET all posts
router.get('/', postController.index);

// POST create post
router.post('/', passport.authenticate('jwt', { session: false, }), isAdmin, postController.create);

// GET post details
router.get('/:id', postController.get);

// PUT update post
router.put('/:id', passport.authenticate('jwt', { session: false, }), isAdmin, postController.update);

// DELETE post
router.delete('/:id', passport.authenticate('jwt', { session: false, }), isAdmin, postController.delete);


module.exports = router;