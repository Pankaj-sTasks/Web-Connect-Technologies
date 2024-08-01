const Post = require('../models/post');

exports.createPost = (req, res) => {
    const { content } = req.body;
    Post.create(req.userId, content, (err, result) => {
        if (err) return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later." });
        return res.json({ "status": true, "data": "Post created successfully." });
    });
};

exports.getAllPosts = (req, res) => {
    Post.findAll((err, results) => {
        if (err) return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later." });
        return res.json({ "status": true, "data": results });
    });
};

exports.getPostsByUser = (req, res) => {
    const userId = req.params.userId;
    Post.findByUserId(userId, (err, results) => {
        if (err) return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later." });
        return res.json({ "status": true, "data": results });
    });
};
