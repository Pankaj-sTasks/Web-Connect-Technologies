const express = require('express');
const postRoute = express.Router();
const { createPost, getAllPosts, getPostsByUser } = require("../controllers/postController");

const common = require("../middleware/auth")

postRoute.post('/',common.tokenMiddlewareUser, createPost);

postRoute.get('/',getAllPosts);

postRoute.post('/:userId', getPostsByUser);


module.exports = postRoute;