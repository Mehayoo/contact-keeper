//middleware is just a function that has access to the request and response cycle and the request and response object
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  //next is a callback function which just says move on to the next piece of middleware
  //Get token from header
  const token = req.header("x-auth-token");

  //Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
