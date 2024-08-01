const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.js');

require('dotenv').config();

exports.register = (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);
    UserModel.create(username, email, hashedPassword, (err, result) => {
        if (err) return  res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
        res.json({ "status": true, "message": "User registered successfully!!!" })
       
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    UserModel.findByEmail(email, (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return  res.json({ "status": false, "message": "User does not exists" });
        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return  res.json({ "status": false, "message": "Invalid login credentials" })
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ "status": true, "message": "Logged in successfully", isLogin: true, token });
    });
};

// exports.register = async (req, res) => {
//     try {

//         let data = req.body
//         if (data && data.password != data.confirmPassword) {
//             return res.json({ "status": false, "message": "Confirm password does not match" })
//         }

//         data.password = encrypt(data.password)

//         userModel.findOne({ $or: [{ "phoneNumber": data.phoneNumber }, { "email": data.email }] }, (err, exUser) => {



//             if (exUser && exUser.email == data.email) {

//                 res.json({ "status": false, "message": `Email Id already exists` })

//             }
//             else if (exUser && exUser.phoneNumber == data.phoneNumber) {

//                 res.json({ "status": false, "message": `Mobile Number already exists` })

//             } else if (!exUser) {

//                 reasonForSignUp.findById({ "_id": data.reasonId }, (err, Rjn) => {
//                     if (Rjn) {
//                         data.isAccountVerified = false
//                         userModel.create(data, async (err, newUser) => {

//                             if (newUser) {
//                                 //     let subject = "Activate your account"
//                                 //     const message = `${newUser.fullName}, click on the following button to activate your account\n

//                                 //     <div style="text-align: center; margin-top: 50px;">
//                                 //     <a href="https://www.kareersity.com/account-activated/${encrypt(newUser._id.toString())}"
//                                 //         style="display: block; margin: 0 auto; background: #107B38; padding: 13px; color: white; cursor: pointer; text-decoration: none; width: 150px;">
//                                 //         Activate Now
//                                 //     </a>
//                                 // </div>
//                                 //     `
//                                 const exTemp = await EmailTempModel.findOne({ "templateName": "To  activate user account" });


//                                 if (!exTemp) {
//                                     return res.json({ "status": false, message: 'Template does not exist.!!!' });
//                                 }

//                                 let dataToReplace = {
//                                     user: newUser.fullName,
//                                     activationLink: `${userContents.accountActivated}` + encrypt(newUser._id.toString())
//                                 }
//                                 let newTemp = UpdateTemplate(exTemp, dataToReplace)
//                                 const template = newTemp.body, subject = newTemp.subject
//                                 // console.log(newTemp.body, newTemp.subject, [email])

//                                 SendSMail(subject, template, [newUser.email], config.krsAWSOptions.senderOrReplyTo, config.krsAWSOptions.senderOrReplyTo).then(() => {
//                                     res.json({ "status": true, "message": "You have registered successfully,Please activate your account!!!", "data": newUser })
//                                 }).catch(err => {
//                                     res.json({ "status": false, "message": "Unable to sign Up" })
//                                 })

//                                 // res.json({ "status": true, "message": "You have registered successfully,Please activate your account!!!", "data": newUser })

//                             } else {

//                                 res.json({ "status": false, "message": "Please try after some time", error: err })
//                             }

//                         })
//                     } else {
//                         res.json({ "status": false, "message": "Please select the reason" })
//                     }
//                 })

//             }
//             else if (err) {

//                 res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })

//             }



//         })

//     } catch (error) {

//         res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
//     }
// }


// exports.userLogin = (req, res) => {

//     let data = req.body

//     data.password = encrypt(data.password)

//     userModel.findOne({ 'email': data.email }, (err, dbUser) => {
//         if (dbUser && dbUser.isActive == false) {
//             res.json({ "status": false, "message": "Account deactivated due to inactivity. Contact admin for reactivation." })
//         } else if (dbUser && dbUser.isAccountVerified == true) {
//             // console.log(dbUser,"---", decrypt(dbUser.password),"---",decrypt(data.password))
//             if (dbUser && dbUser.password === data.password) {
//                 if (dbUser && dbUser.isNewUser == null) {

//                     dbUser.isNewUser = true

//                     dbUser.save()

//                     let payload = createPayloadUser(encrypt(dbUser._id.toString()));

//                     res.json({ "status": true, "message": "Logged in successfully", "userName": dbUser.fullName, "origin": payload, "newlySignUp": true })

//                 } else if (dbUser && dbUser.isNewUser == true || dbUser && dbUser.isNewUser == false) {

//                     dbUser.isNewUser = false
//                     dbUser.save()
//                     let payload = createPayloadUser(encrypt(dbUser._id.toString()));

//                     res.json({ "status": true, "message": "Logged in successfully", "userName": dbUser.fullName, "origin": payload, "newlySignUp": false })

//                 }
//             } else {

//                 res.json({ "status": false, "message": "Invalid login credentials" })
//             }
//         } else if (dbUser && dbUser.isAccountVerified == false) {
//             res.json({ "status": false, "message": "Please , verify your account !!!" })
//         } else {
//             return res.json({ "status": false, "message": "User does not exists" });
//         }
//     })

// }

// exports.verifyAccount = async (req, res) => {


//     try {
//         const verificationCode = decrypt(req.params.token);
//         //console.log(verificationCode)

//         const user = await userModel.findOneAndUpdate(
//             { "_id": verificationCode },
//             { $set: { isAccountVerified: true } },
//             { new: true }
//         );

//         if (!user) {
//             return res.json({ "status": false, message: 'Invalid Verification code' });
//         }

//         return res.json({ "status": true, message: 'Account verified successfully' });
//     } catch (error) {
//         console.error('Error verifying account:', error);
//         return res.json({ message: 'Internal server error' });
//     }
// }

// exports.editUserPersonelProfile = async (req, res) => {

//     try {

//         let id = req.userid
//         let data = req.body

//         let findUser = await userModel.findById(id)

//         if (!findUser) {
//             return res.json({ "status": false, "message": "User does not exists" })
//         }

//         let dupEmail = await userModel.findOne({ "email": data.email })

//         if (dupEmail) {
//             return res.json({ "status": false, "message": "Email already exists" })
//         }
//         let dupPhone = await userModel.findOne({ "phoneNumber": data.phoneNumber })
//         if (dupPhone) {
//             return res.json({ "status": false, "message": "Phone number already exists" })
//         }

//         let updateUser = await userModel.findByIdAndUpdate(id, data, { new: true })

//         if (updateUser) {
//             return res.json({ "status": true, "message": "User profile updated successfully", "data": updateUser })
//         } else {
//             return res.json({ "status": false, "message": "Unable to update user detail" })
//         }
//     }

//     catch (e) {
//         console.log(e)
//         return res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" })
//     }
// }
