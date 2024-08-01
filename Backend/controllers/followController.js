const Follow = require('../models/follow');

exports.followUser = (req, res) => {
    const followeeId = req.params.userId;
    Follow.create(req.userId, followeeId, (err, result) => {
       if (err) return  res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" }) 
         res.json({ "status": true,"message" :'User followed successfully'});
    });
};

exports.getFollowedPosts = (req, res) => {
    Follow.findFollowedPosts(req.userId, (err, results) => {
       if (err) return  res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" }) 
        res.json({ "status": true,"data" : results});
    });
};
