const passport = require("passport");

const isAuthenticated = (req, res, next) => {
  return passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      res.status(500).send({ message: "Internal Server Error" });
    }

    if (user) {
      req.user = user; // Manually set the user in req
      next();
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  })(req, res);
};

module.exports = isAuthenticated;
