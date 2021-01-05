const passport = require("passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const User = require("../models/user");

// ADMINCODE for signing up users as administrators. Store/alter as fit
const ADMINCODE = "blogger";

// User list
exports.user_list = (req, res, next) => {
  User.find()
    .populate("message post")
    .exec()
    .then((user_list) => res.send(user_list))
    .catch((err) => next(err));
};

// User sign up
exports.signup = [
  body("username", "Username must be entered")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .custom(async (value, { req }) => {
      const usernames = (await User.find({}, "username")).map(
        (obj) => obj.username
      );
      if (usernames.includes(value)) {
        throw new Error("Username already taken");
      }
      return true;
    }),
  body("email", "Must be valid email")
    .isEmail()
    .escape()
    .custom(async (value, { req }) => {
      const emails = (await User.find({}, "email")).map((obj) => obj.email);
      if (emails.includes(value)) {
        throw new Error("Email already registered");
      }
      return true;
    }),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long")
    .escape(),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords must match");
    }
    return true;
  }),
  body("adminCode").custom((value, { req }) => {
    if (value && value !== ADMINCODE) {
      throw new Error("Incorrect code");
    } else if (value === ADMINCODE) {
      req.admin = true;
    }
    return true;
  }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(500).json({ ...errors, ...req.body });
    }

    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }

      new User({
        ...req.body,
        password: hashedPassword,
      })
        .save()
        .then((user) =>
          res.status(200).send({
            user,
            message: "succesful registration",
          })
        )
        .catch((err) => next(err));
    });
  },
];

// User login
exports.login = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, message) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).send({ ...message });
    }

    req.login(user, { session: false }, (err) => {
      if (err) return next(err);
      // generate a signed json web token with contents of user object and return in res
      const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: "1d" });
      return res.json({ token, username: user.username, admin: user.admin });
    });
  })(req, res, next);
};

// User logout
exports.logout = (req, res) => {
  req.logout();
  res.json({
    message: "logout successful",
  });
};

// User summary
exports.user_index = (req, res, next) => {
  User.findById(req.params.id)
    .populate("comment post")
    .exec()
    .then((user) => res.send(user))
    .catch((err) => next(err));
};
