const User = require('../models/user.model');

exports.createUser = (req, res) => {

  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };

  User.create(userData, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating user', error: err });
    }
    res.status(201).json({ message: 'User created successfully', userId: result.insertId });
  });

};