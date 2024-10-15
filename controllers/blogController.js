const pool = require('../config/db');

// display all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM blogs ORDER BY date_created DESC');
    res.render('home', { blogs: result.rows });
  } catch (err) {
    console.error(err.message);
    res.send('Error fetching blogs');
  }
};

//create a new blog post
exports.createBlog = async (req, res) => {
  const { title, body } = req.body;
  const creator_user_id = req.session.user_id;

  try {
    const user = await pool.query('SELECT name FROM users WHERE user_id = $1', [creator_user_id]);
    const creator_name = user.rows[0].name;

    await pool.query(
      'INSERT INTO blogs (creator_name, creator_user_id, title, body, date_created) VALUES ($1, $2, $3, $4, NOW())',
      [creator_name, creator_user_id, title, body]
    );
    res.redirect('/blogs');
  } catch (err) {
    console.error(err.message);
    res.send('Error creating blog post');
  }
};

// load the edit form
exports.getEditBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM blogs WHERE blog_id = $1', [id]);
    if (result.rows.length === 0) {
      return res.send('Post not found.');
    }

    const blog = result.rows[0];
    if (blog.creator_user_id !== req.session.user_id) {
      return res.send('You are not authorized to edit this post.');
    }

    res.render('edit-post', { blog });
  } catch (err) {
    console.error(err.message);
    res.send('Error loading edit form');
  }
};

// handle updating the blog post
exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  try {
    await pool.query(
      'UPDATE blogs SET title = $1, body = $2 WHERE blog_id = $3 AND creator_user_id = $4',
      [title, body, id, req.session.user_id]
    );
    res.redirect('/blogs');
  } catch (err) {
    console.error(err.message);
    res.send('Error updating blog post');
  }
};

// handle deleting a blog post
exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM blogs WHERE blog_id = $1 AND creator_user_id = $2', [id, req.session.user_id]);
    res.redirect('/blogs');
  } catch (err) {
    console.error(err.message);
    res.send('Error deleting blog post');
  }
};
