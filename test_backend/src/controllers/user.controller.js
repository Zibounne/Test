const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../middleware/user/auth.middleware');
const jwt = require('jsonwebtoken');

// Sign Up
exports.signUp = (req, res) => {
  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  User.create(userData, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating user', error: err });
    }
    res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  });
};

// Sign In
exports.signIn = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, async (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err });
    }

    if (!user) {
      return res.status(401).json({ message: "Email or password incorrect." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Email or password incorrect." });
    }

    // Utiliser les fonctions du middleware pour générer les tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return res.status(200).json({
      message: "SignIn successful",
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: { id: user.id, email: user.email, username: user.username }
    });
  });
};

// Refresh Token
exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required" });
  }

  // Vérifier la validité du Refresh Token
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // Générer un nouveau Access Token
    const newAccessToken = generateAccessToken(user);

    return res.status(200).json({
      accessToken: newAccessToken
    });
  });
};

// Profile
exports.getProfile = (req, res) => {
  const userId = req.userId;

  User.findById(userId, (err, user) => {
    if (err) {
      return res.status(500).json({ message: 'Server error', error: err });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  });
};

// Sign Out
exports.signOut = (req, res) => {
  res.status(200).json({ message: 'Sign out successful' });
};