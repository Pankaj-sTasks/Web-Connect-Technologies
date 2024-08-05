const express = require('express');
const userRoute = express.Router();
const {register, login, userInfo} = require("../controllers/userController");
const { postValidation} = require('../middleware/validation');

const common = require("../middleware/auth")



userRoute.post('/register', postValidation,register);

userRoute.post('/login',postValidation, login);

userRoute.get('/userInfo/:userId',common.tokenMiddlewareUser,userInfo);


module.exports = userRoute;