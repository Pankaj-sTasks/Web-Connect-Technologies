const Like = require('../models/like');

exports.likePost = (req, res) => {
    const postId = req.params.postId;
    const userId = req.userId;


        Like.create(userId, postId, (err, result) => {
            if (err) return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });

            res.json({ "status": true, "message": 'Post liked successfully' });
        });
    

};

exports.getLikesByUser = (req, res) => {

    Like.findByUserId(req.userId, (err, results) => {
        if (err) return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
        res.json({ "status": true, "data": results });
    });
};
