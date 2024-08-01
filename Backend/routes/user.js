const express = require('express');
const userRoute = express.Router();
const {register, login} = require("../controllers/userController");
const common = require("../middleware/auth")
//const { postValidation } = require('../common/validation')




userRoute.post('/register', register);

//userRoute.get('/activate_account/:token',customerConfigCntrl.verifyAccount);

userRoute.post('/login', login);

// userRoute.post('/forgotPassword',postValidation,  customerConfigCntrl.forgotPassword);

// userRoute.post('/confirmPassword',postValidation,  customerConfigCntrl.confirmPasswordUser);

// userRoute.get('/resetPassword/:token',  customerConfigCntrl.resetPasswordButton);


module.exports = userRoute;