const express = require('express');
const followRoute = express.Router();
const { followUser, getFollowedPosts } = require("../controllers/followController");
const common = require("../middleware/auth")
//const { postValidation } = require('../common/validation')

followRoute.post('/:userId/follow',common.tokenMiddlewareUser,followUser);
followRoute.get('/followed-posts',common.tokenMiddlewareUser,getFollowedPosts);


module.exports = followRoute;