const db = require('./db');

const Like = {
    create: (userId, postId, callback) => {
        db.query('INSERT INTO likes (user_id, post_id) VALUES (?, ?)', [userId, postId], callback);
    },
    findByUserId: (userId, callback) => {
        db.query('SELECT * FROM likes WHERE user_id = ?', [userId], callback);
    },
    
};

module.exports = Like;
