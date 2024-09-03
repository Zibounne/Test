const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Sign Up
exports.signUp = (req, res) => {

  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname
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

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.status(200).json({
      message: "SignIn successful",
      token: token,
      user: { id: user.id, email: user.email, username: user.username }
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