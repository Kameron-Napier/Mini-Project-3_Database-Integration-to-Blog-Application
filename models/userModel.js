const db = require('../config/db');

// user model constructor
class User {
    constructor(user_id, password, name) {
        this.user_id = user_id;
        this.password = password;
        this.name = name;
    }

    // create a new user
    static async create(user_id, password, name) {
        const result = await db.query(
            'INSERT INTO users (user_id, password, name) VALUES ($1, $2, $3) RETURNING *',
            [user_id, password, name]
        );
        return result.rows[0];
    }

    // get a user
    static async getById(user_id) {
        const result = await db.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        return result.rows[0];
    }

    // check if user exists
    static async exists(user_id) {
        const result = await db.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        return result.rowCount > 0;
    }

    // validate user credentials
    static async validateCredentials(user_id, password) {
        const result = await db.query(
            'SELECT * FROM users WHERE user_id = $1 AND password = $2',
            [user_id, password]
        );
        return result.rowCount > 0;
    }
}

module.exports = User;
