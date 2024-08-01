const express = require('express');
const likeRoute = express.Router();
const { likePost, getLikesByUser } = require("../controllers/likeController");
const common = require("../middleware/auth")
//const { postValidation } = require('../common/validation')


likeRoute.post('/:postId/like',common.tokenMiddlewareUser,  likePost);
likeRoute.get('/user/:userId',  getLikesByUser);

module.exports = likeRoute;