const express = require("express"),
  bcrypt = require("bcryptjs"),
  config = require("config"),
  jwt = require("jsonwebtoken"),
  router = express.Router();

const auth = require("../../middleware/auth");
const User = require("../../models/User");

router.post("/", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    res.status(400).json({ msg: "Please enter all fields!" });

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User does not exists!" });

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ msg: "Invalid credentials!" });

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
            },
          });
        }
      );
    });
  });
});

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
