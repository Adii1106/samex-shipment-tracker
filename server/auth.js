const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "samex-secret-key";

// Single hardcoded user
const VALID_USER = { username: "admin", password: "samex123" };

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token" });
  }
  try {
    jwt.verify(authHeader.slice(7), JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

function login(req, res) {
  const { username, password } = req.body;
  if (username !== VALID_USER.username || password !== VALID_USER.password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "8h" });
  res.json({ token });
}

module.exports = { authMiddleware, login };
