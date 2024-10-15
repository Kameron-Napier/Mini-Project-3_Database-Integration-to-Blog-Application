const db = require('../config/db');

// blog model constructor
class Blog {
    constructor(blog_id, creator_name, creator_user_id, title, body, date_created) {
        this.blog_id = blog_id;
        this.creator_name = creator_name;
        this.creator_user_id = creator_user_id;
        this.title = title;
        this.body = body;
        this.date_created = date_created;
    }

    // create a new blog post
    static async create(creator_name, creator_user_id, title, body) {
        const date_created = new Date();
        const result = await db.query(
            'INSERT INTO blogs (creator_name, creator_user_id, title, body, date_created) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [creator_name, creator_user_id, title, body, date_created]
        );
        return result.rows[0];
    }

    // fet all blog posts
    static async getAll() {
        const result = await db.query('SELECT * FROM blogs ORDER BY date_created DESC');
        return result.rows;
    }

    // get a blog post by id
    static async getById(blog_id) {
        const result = await db.query('SELECT * FROM blogs WHERE blog_id = $1', [blog_id]);
        return result.rows[0];
    }

    // update a blog post
    static async update(blog_id, title, body) {
        const result = await db.query(
            'UPDATE blogs SET title = $1, body = $2 WHERE blog_id = $3 RETURNING *',
            [title, body, blog_id]
        );
        return result.rows[0];
    }

    // delete a blog post
    static async delete(blog_id) {
        await db.query('DELETE FROM blogs WHERE blog_id = $1', [blog_id]);
    }
}

module.exports = Blog;
