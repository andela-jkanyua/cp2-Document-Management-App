const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

module.exports = {
  generate: user => jwt.sign({ user }, secret, {
    expiresIn: '24h',
  }),
};
