const db = require('./db');

const User = {
    create: (username, email, password, callback) => {
        db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], callback);
    },
    findByEmail: (email, callback) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], callback);
    },
    findById: (id, callback) => {
        db.query('SELECT * FROM users WHERE id = ?', [id], callback);
    }
};

module.exports = User;
