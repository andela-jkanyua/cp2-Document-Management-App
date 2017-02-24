const jwt = require('jsonwebtoken');

module.exports = {
  generate: (user) => jwt.sign(user.password, process.env.SECRET),
};