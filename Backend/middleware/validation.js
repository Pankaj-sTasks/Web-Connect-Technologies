const validator = require('node-validator');
let emptycheck = /([^\s])/i;
let email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

exports.postValidation = (req, res, next) => {

    try {
        let path = req.route.path;

        let data = req.body;
        let check;
        if (path == '/register') {

            check = validator.isObject()
                .withRequired('username', validator.isString({ regex: emptycheck, message: "Please provide valid name" }))
                .withRequired('email', validator.isString({ regex: email, message: "Please provide valid email" }))
                .withRequired('password', validator.isNumber({ regex: emptycheck, message: "Please provide valid password" }))
        } else if (path == '/login') {

            check = validator.isObject()
                .withRequired('email', validator.isString({ regex: email, message: "Please provide valid email" }))
                .withRequired('password', validator.isString({ regex: emptycheck, message: "Please provide valid password" }))
        } else {
            // Handle unsupported paths
            throw new Error("not found");
        }

        validator.run(check, data, (errorcount, errors) => {
            if (errorcount === 0) {
                next();
            } else {
                let currentIndex = 0;
        
                function convertToUserFriendly(parameter) {
                    let friendlyParameter = parameter.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2').replace(/^./, str => str.toUpperCase());

                    // Remove ".length" suffix for array-related errors
                    friendlyParameter = friendlyParameter.replace(/\.length$/, '');
                    if (parameter.includes('[') && parameter.includes(']')) {
                        
                        friendlyParameter = friendlyParameter.replace(/\[\d+\]/, '');
                    }
                    return friendlyParameter;
                }
        
                function displayError() {
                    if (currentIndex < errors.length) {
                        let currentError = errors[currentIndex];
        
                        let errormsg = '';
                        if (currentError.message == 'Required value.' && currentError.value == undefined) {
                            currentError.message = convertToUserFriendly(currentError.parameter) + ' is required.!';
                        } else if (currentError.value != undefined || currentError.value == "" || currentError.value == [] || currentError.message == "Unexpected value.") {
                            currentError.message = "Not a valid " + convertToUserFriendly(currentError.parameter) + ".!";
                        } else {
                            currentError.message = currentError.message;
                        }
                        errormsg = currentError.message;
        
                        res.json({ "status": false, "message": errormsg });
        
                        currentIndex++;
                    } else {
                        // If all errors are displayed, you can proceed to the next step
                        next();
                    }
                }
        
                // Initial display of the first error
                displayError();
            }
        });
    } catch (e) {

        if (e.message === "not found") {
            res.json({ "status": false, "message": "Invalid URL !!!" });
        } else {
            res.json({ "status": false, "message": "Oops! Something went wrong. Please try again later" });
        }
    }
}