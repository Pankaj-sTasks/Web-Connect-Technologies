
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.tokenMiddlewareUser = (req, res, next) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(' ')[1];
    if (token != null) {

      
      jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (payload) {
          //console.log(payload.id)
          req.userId = payload.id;
          next();
        } else {
          res.json({ "status": false, "message": "Please login first to access this feature." })
        }
      })
    } else {
      res.json({ "status": false, "message": "Please login first to access this feature." })
    }
  } else {
    res.json({ "status": false, "message": "Please login first to access this feature." })
  }
}
