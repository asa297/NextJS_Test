const jwt = require("jsonwebtoken");
const passport = require("passport");

module.exports = server => {
  server.get(
    "/api/auth/me",
    passport.authenticate("jwt", { session: false }),
    function(req, res, next) {
      res.send(req.user);
    }
  );

  server.post("/api/auth/login", function(req, res, next) {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: info ? info.message : "Login failed",
          user: user
        });
      }

      req.login(user, { session: false }, err => {
        if (err) {
          res.send(err);
        }

        var token = jwt.sign({ id: user._id }, "your_jwt_secret", {
          expiresIn: 10 // expires in 24 hours
        });

        return res.json({ token });
      });
    })(req, res);
  });
};
