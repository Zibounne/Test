const jwt = require('jsonwebtoken');

// Generate Access Token
function generateAccessToken(user) {
  return jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
}

// Generate Refresh Token
function generateRefreshToken(user) {
  return jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });
}

// Middleware pour vérifier le token d'accès
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: "Access token is required" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired access token" });
    
    req.userId = user.userId; // Ajoute l'ID de l'utilisateur dans la requête pour le controller
    next();
  });
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  authenticateToken
};