const Users = require('../models').Users;
const Documents = require('../models').Documents;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const saltRounds = 10;
const secret = process.env.SECRET;
/**
 * Represents a User.
 */
class User {
    /**
    * Generates a token, logs in a user
    * @param {Object} req Incoming HTTP request.
    * @param {Object} res Outgoing HTTP response.
    * @returns {Object} the created document.
    */
  static login(req, res) {
    if (!(req.body.email && req.body.password)) {
      return res.status(400).json({ success: false, message: 'User Email and Password required.' });
    }
    Users.find({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User Not Found',
        });
      } else if (user) {
        bcrypt.compare(req.body.password, user.password, (err, auth) => {
          if (!auth) {
            res.status(401).json({ success: false, message: 'Authentication Failed. Wrong Password' });
          } else {
            const token = jwt.sign(
              {
                user: {
                  id: user.id,
                  email: user.email,
                  roleId: user.roleId } },
                  secret,
              {
                expiresIn: '24h',
              }
            );
            return res.json(
              { success: true,
                message: 'Authenticated',
                token,
                user:
                {
                  id: user.id,
                  email: user.email,
                  roleId: user.roleId
                }
              }
            );
          }
        });
      }
    })
    .catch(error => res.status(400).send(error));
  }
  /**
  * Create a user
  * @param {Object} req Incoming HTTP request.
  * @param {Object} res Outgoing HTTP response.
  * @returns {Object} the created user.
  */
  static create(req, res) {

    if (req.body.email === undefined || req.body.password === undefined ||
       req.body.username === undefined || req.body.firstName === undefined
     || req.body.lastName === undefined || req.body.roleId === undefined) {
       return res.status(400).send({
         success: false,
         message: `Please provide 'email', 'password', 'username', 'firstName', 'lastName', 'roleId'`  });
     }
    const emailTest = /\S+@\S+\.\S+/;
    if (!emailTest.test(req.body.email)) {
        return res.status(406).send({
          success: false,
          message: 'Not a valid email address' });
      }

    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        Users.create({
          email: req.body.email,
          password: hash,
          username: req.body.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          roleId: req.body.roleId,
        })
      .then(user => res.status(201).send({ message: ` User email:, ${user.email} Created!`, success: true }))
      .catch(error => res.status(400).send(error));
      });
    });
  }
  /**
  * Lists all Users
  * @param {Object} req Incoming HTTP request.
  * @param {Object} res Outgoing HTTP response.
  * @returns {array} array of user objects.
  */
  static list(req, res) {
    if (!(req.query.limit && req.query.offset)) {
      return Users
      .all(
        {
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt'],
          },
        })
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
    }
    if (isNaN(parseInt(req.query.limit, 10)) || isNaN(parseInt(req.query.offset, 10))) {
      return res.status(400).send({ success: false, message: 'Query Parameters are not Integers.' });
    }
    Users.findAll({ offset: req.query.offset, limit: req.query.limit })
    .then(usr => res.status(200).send(usr))
    .catch(error => res.status(400).send(error));
  }
  /**
  * Gets a specific User
  * @param {Object} req Incoming HTTP request.
  * @param {Object} res Outgoing HTTP response.
  * @returns {object} user object.
  */
  static retrieve(req, res) {
    return Users
    .findById(req.params.userId, {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
      include: [{
        model: Documents,
      }],
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      return res.status(200).send(user);
    })
    .catch(error => res.status(400).send(error));
  }
  /**
  * Update a document
  * @param {Object} req Incoming HTTP request.
  * @param {Object} res Outgoing HTTP response.
  * @returns {object} updated user object.
  */
  static update(req, res) {
    return Users
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      return user
        .update({
          email: req.body.email || user.email,
          password: req.body.password || user.password,
          firstName: req.body.firstName || user.firstName,
          lastName: req.body.lastName || user.lastName,
          roleId: req.body.roleId || user.roleId,
        })
        .then(() => res.status(200).send(user))  // Send back the updated user.
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }
  /**
  * Delete a User
  * @param {Object} req Incoming HTTP request.
  * @param {Object} res Outgoing HTTP response.
  * @returns {object} deleted user object.
  */
  static destroy(req, res) {
    return Users
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          message: 'User Not Found',
        });
      }
      return user
        .destroy()
        .then(() => res.status(204).send(user))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }
  /**
  * Find a user
  * @param {Object} req Incoming HTTP request.
  * @param {Object} res Outgoing HTTP response.
  * @returns {object} selected user object.
  */
  static findAll(req, res) {
    return Users
    .findAll({
      where: {
        $or: [
          {
            username: { $iLike: `%${req.query.q}%` },
          },
        ],
      },
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
    })
    .then((user) => {
      if (user.length < 1) {
        return res.status(404).send({
          message: 'No Users Found.',
        });
      }
      return res.status(200).send(user);
    })
    .catch(error => res.status(400).send(error));
  }
  /**
  * Logs out a user
  * @param {Object} req Incoming HTTP request.
  * @param {Object} res Outgoing HTTP response.
  * @returns {object} Object with logout message key.
  */
  static logout(req, res) {
    req.headers['x-access-token'] = null;
    req.decoded = null;
    res.status(204).send({ message: 'User logged out.' });
  }
}
exports.User = User;
