const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.js');
const LikeModel = require('../models/like.js');
const FollowModel = require('../models/follow.js');
const PostModel = require('../models/post.js');

require('dotenv').config();

exports.register = (req, res) => {
    const { username, email, password } = req.body;
    UserModel.findByEmail(email, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length !== 0) return res.json({ "status": false, "message": "User already exists" });
        const hashedPassword = bcrypt.hashSync(password, 8);
        UserModel.create(username, email, hashedPassword, (err, result) => {
            if (err) return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
            res.json({ "status": true, "message": "User registered successfully!!!" })

        });
    });

};

exports.login = (req, res) => {
    const { email, password } = req.body;
    UserModel.findByEmail(email, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.json({ "status": false, "message": "User does not exists" });
        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.json({ "status": false, "message": "Invalid login credentials" })
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ "status": true, "message": "Logged in successfully", isLogin: true, token });
    });
};

exports.userInfo = (req, res) => {
    const userId = req.params.userId;
    UserModel.findById(userId, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.json({ "status": false, "message": "User does not exist" });
        const user = results[0];
        res.json({ "status": true, data: { id: user.id, name: user.username, email: user.email } });
    });
};

