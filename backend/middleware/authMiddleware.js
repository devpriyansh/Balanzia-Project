let jwt = require("jsonwebtoken");

let protect = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Not Authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid Token" });
  }
};

module.exports = protect;
