module.exports = (req, res, next) => {
    if (req.user.admin) { next() }
    else { res.status(403).send({ message: 'User does not have administrative privelages'}) }
}