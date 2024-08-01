const db = require('./db');

const Post = {
    create: (userId, content, callback) => {
        db.query('INSERT INTO posts (user_id, content) VALUES (?, ?)', [userId, content], callback);
    },
    findAll: (page, limit, callback) => {
        const offset = (page - 1) * limit;
        const sql = `
            SELECT posts.*, users.username 
            FROM posts 
            JOIN users ON posts.user_id = users.id 
            LIMIT ? OFFSET ?`;
    
        db.query(sql, [limit, offset], callback);
    },
    
    findByUserId: (userId, callback) => {
        db.query('SELECT * FROM posts WHERE user_id = ?', [userId], callback);
    }
};

module.exports = Post;
