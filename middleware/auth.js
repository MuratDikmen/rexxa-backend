const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  console.log(token);
  if (!token) {
    return res.status(500).json({ msg: "No token, authorization denied." });
  } else {
    try {
      const decoded = jwt.verify(JSON.parse(token), config.get("jwtSecret"));
      req.user = decoded.user;
      req.usertype = decoded.userType;
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ msg: "Invalid token." });
    }
  }
};
