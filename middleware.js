const jwt = require("jsonwebtoken");
const { jwtToken } = require("./secrets");

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer token
  if (!token) return res.status(401).send({ message: "Access Denied" });

  jwt.verify(token, jwtToken, (err, decoded) => {
    if (err) return res.status(403).send({ message: "Invalid Token" });

    req.user = decoded; // Attach the decoded payload to the request object
    next();
  });
}

module.exports = { authenticateToken };
