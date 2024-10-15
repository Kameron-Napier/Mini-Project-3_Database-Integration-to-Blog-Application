const express = require('express');
const session = require('express-session');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
app.use(express.urlencoded({ extended: true }));

// ejs setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// static files
app.use(express.static(path.join(__dirname, 'public')));

// session management
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: true
}));

// routes
app.use(authRoutes);
app.use(blogRoutes);

// server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
