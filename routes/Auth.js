const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config");
const VerifyToken = require("../middleware/VerifyToken");

module.exports = server => {
  server.post("/api/auth/register", async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token });
  });

  server.get("/api/auth/me", VerifyToken, function(req, res, next) {
    // console.log(req.userId);
    User.findById(req.userId, { password: 0 }, function(err, user) {
      if (err)
        return res.status(500).send("There was a problem finding the user.");
      if (!user) return res.status(404).send("No user found.");
      res.status(200).send(user);
    });
  });

  server.post("/api/auth/login", function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
      if (err) return res.status(500).send("Error on the server.");
      if (!user) return res.status(404).send("No user found.");
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid)
        return res.status(401).send({ auth: false, token: null });
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    });
  });

  server.get("/api/auth/logout", function(req, res) {
    res.status(200).send({ auth: false, token: null });
  });
};
