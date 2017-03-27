const path = require('path');
const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;


// route to authenticate a user (POST http://localhost:env.PORT/login

module.exports = (app) => {
// route middleware to verify a token
  app.use((req, res, next) => {
  // check header or url parameters or post parameters for token
    const token = req.headers['x-access-token'];
  // decode token
    if (token) {
    // verifies secret and checks exp
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return res
          .status(401)
          .json({
            success: false, message: 'Failed to authenticate token.' });
        }
        // Check if token is valid
        req.decoded = decoded;
        next();
      });
    } else {
      // if there is no token
      // return an error
      return res.status(403).json({success: false, message: 'No token provided'});
    }
  });
};
