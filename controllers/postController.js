const Post = require("../models/post");
const User = require('../models/user');
const Comment = require('../models/comment');

const { body, validationResult } = require("express-validator");

// Get all posts
exports.index = (req, res, next) => {
  Post.find()
    .sort([["timeCreated", "ascending"]])
    .populate("comment")
    .exec()
    .then((posts) => res.send({ posts }))
    .catch((err) => next(err));
};

// Post post
exports.post = [
  body("title", "title required")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape(),
  body("content", "content required")
    .trim()
    .isLength({ min: 1, max: 5000 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(500).json({ ...errors, ...req.body });

    new Post({
      ...req.body,
      author: req.user,
    })
      .save()
      .then((post) => res.send({ post, message: "Post submitted" }))
      .catch((err) => next(err));
  },
];

// Get post details
exports.get = (req, res, next) => {
  Post.findById(req.params.id)
    .populate("comment author")
    .exec()
    .then((post) => res.send({ post }))
    .catch((err) => next(err));
};

// Update post
exports.update = [
  body("title").trim().isLength({ min: 1, max: 100 }).escape(),
  body("content").trim().isLength({ min: 1, max: 5000 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(500).json({ errors, ...req.body });
    }

    const update = {
      ...req.body,
      timeEdited: Date.now(),
    };

    Post.findByIdAndUpdate(req.params.id, update, { new: true })
      .then((post) => res.send({ post, message: "Post updated" }))
      .catch((err) => next(err));
  },
];

// Delete post
exports.delete = (req, res, next) => {
  Post.findByIdAndDelete(req.params.id)
    .then((post) => res.send({ post, message: "Post removed" }))
    .catch((err) => next(err));
};

// Post a comment
exports.commentPost = [
  body("content", "content required")
    .isLength({ min: 1, max: 500 })
    .trim()
    .escape(),

  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(500).send({ errors, ...req.body });

    try {
      const author = await User.findById(req.user.id);
      const post = await Post.findById(req.params.id);

      new Comment({
        ...req.body,
        author,
        post,
      })
        .save()
        .then((comment) => res.send({ message: "comment added", comment }))
        .catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  },
];

// Remove a comment
exports.commentDelete = (req, res, next) => {
    Comment.findByIdAndDelete(req.params.commentId)
        .then((comment) => res.send({ comment, message: 'comment removed' }))
        .catch((err) => next(err));
}