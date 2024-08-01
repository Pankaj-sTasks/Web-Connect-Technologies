const Post = require('../models/post');

exports.createPost = (req, res) => {
    const { content } = req.body;
    Post.create(req.userId, content, (err, result) => {
        if (err) return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later." });
        return res.json({ "status": true, "data": "Post created successfully." });
    });
};

exports.getAllPosts = (req, res) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided

    // Call your findAll method with pagination
    Post.findAll(page, limit, (err, results) => {
        if (err) {
            return res.status(500).json({ status: false, message: 'Oops! Something went wrong. Please try again later' });
        }

        res.json({ status: true, data: results });
    });
};

exports.getPostsByUser = (req, res) => {
    const userId = req.params.userId;
    Post.findByUserId(userId, (err, results) => {
        if (err) return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later." });
        return res.json({ "status": true, "data": results });
    });
};
