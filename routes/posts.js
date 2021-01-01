const express = require("express");
const router = express.Router();
const passport = require("passport");

const isAdmin = require("../middleware/isAdmin");

const postController = require("../controllers/postController");

// GET all posts
router.get("/", postController.index);

// POST create post
router.post(
  "/",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  isAdmin,
  postController.post
);

// GET post details
router.get("/:id", postController.get);

// PUT update post
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  isAdmin,
  postController.update
);

// DELETE post
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  isAdmin,
  postController.delete
);

// POST create comment
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  postController.commentPost
);

// DELETE comment
router.delete(
  "/:id/:commentId",
  passport.authenticate("jwt", { session: false, failWithError: true }),
  isAdmin,
  postController.commentDelete
);

module.exports = router;
