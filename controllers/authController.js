const pool = require('../config/db');
const bcrypt = require('bcrypt');

// handle signup
exports.signup = async (req, res) => {
  const { user_id, name, password } = req.body;

  const userExists = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
  if (userExists.rows.length > 0) {
    return res.send('User ID is already taken.');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await pool.query('INSERT INTO users (user_id, name, password) VALUES ($1, $2, $3)', [user_id, name, hashedPassword]);

  res.redirect('/signin');
};

// handle signin
exports.signin = async (req, res) => {
  const { user_id, password } = req.body;

  const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
  if (user.rows.length === 0) {
    return res.send('Invalid user ID or password.');
  }

  const validPassword = await bcrypt.compare(password, user.rows[0].password);
  if (!validPassword) {
    return res.send('Invalid user ID or password.');
  }

  req.session.user_id = user_id;
  res.redirect('/blogs');
};
