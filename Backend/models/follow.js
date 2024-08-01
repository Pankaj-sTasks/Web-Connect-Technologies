const db = require('./db');

const Follow = {
    create: (followerId, followeeId, callback) => {
        db.query('INSERT INTO follows (follower_id, followee_id) VALUES (?, ?)', [followerId, followeeId], callback);
    },
    findByUserId: (userId, callback) => {
        db.query('SELECT * FROM follows WHERE follower_id = ?', [userId], callback);
    },
    findFollowedPosts: (userId, callback) => {
        db.query(`
            SELECT posts.*, users.username 
            FROM posts 
            JOIN follows ON posts.user_id = follows.followee_id 
            JOIN users ON posts.user_id = users.id 
            WHERE follows.follower_id = ?
        `, [userId], callback);
    }
};

module.exports = Follow;
