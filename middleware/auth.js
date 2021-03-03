const config = require("config"),
  jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) res.status(401).json({ mas: "No token, user not authorized!" });
  try {
    const decode = jwt.verify(token, config.get("jwtSecret"));
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "token invalid" });
  }
}

module.exports = auth;
