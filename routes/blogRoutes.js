const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// route to get all blogs
router.get('/blogs', blogController.getAllBlogs);

// route to create a new blog post
router.post('/create-post', blogController.createBlog);

// route to load the form for editing a specific blog post
router.get('/edit-post/:id', blogController.getEditBlog);

// route to handle the submission of the edited blog post
router.post('/edit-post/:id', blogController.updateBlog);

// route to delete a specific blog post
router.get('/delete-post/:id', blogController.deleteBlog);

module.exports = router;
