const bcrypt = require('bcrypt');
const User = require('../models/user');

// Signup
exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword
    });
    req.session.userId = user.id;
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error signing up');
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      req.session.userId = user.id;
      res.redirect('/dashboard');
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};
