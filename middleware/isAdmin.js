module.exports = (req, res, next) => {
  if (!req.user) {
    res.status(401).send({ message: "Not logged in." });
  }
  if (!req.user.admin) {
    res
      .status(403)
      .send({ message: "User does not have administrative privelages" });
  } else {
    next();
  }
};
