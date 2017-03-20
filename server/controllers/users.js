const Users = require('../models').Users;

const Documents = require('../models').Documents;

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

const saltRounds = 10;
const secret = process.env.SECRET;

class User {
  login(req, res) {
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
            const token = jwt.sign({user: {id: user.id, email: user.email, roleId: user.roleId } }, secret,
              {
                expiresIn: '24h',
              });
            return res.json({ success: true, message: 'Authenticated', token });
          }
        });
      }
    })
    .catch(error => res.status(400).send(error));
  }
  create(req, res) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        Users.create({
          email: req.body.email,
          password: hash,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          roleId: req.body.roleId,
        })
      .then(user => res.status(201).send({ message: ` User email:, ${user.email} Created!`, success: true }))
      .catch(error => res.status(400).send(error));
      });
    });
  }
  list(req, res) {
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
    } else {
      if(isNaN(parseInt(req.query.limit, 10)) || isNaN(parseInt(req.query.offset, 10))){
        return res.status(400).send({success: false, message: 'Query Parameters are not Integers.'});
      }
      Users.findAll({ offset: req.query.offset, limit: req.query.limit })
      .then( usr => res.status(200).send(usr))
      .catch(error => res.status(400).send(error));
    }
  }
  retrieve(req, res) {
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

  update(req, res) {
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
  destroy(req, res) {
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
  findAll(req, res) {
    return Users
    .findAll({
      where: {
        $or: [
          {
            username: { $iLike: `%${req.query.q}%` },
          },
        ],
      },
    })
    .then((user) => {
      if (user.length<1) {
        return res.status(404).send({
          message: 'No Users Found.',
        });
      }
      return res.status(200).send(user);
    })
    .catch(error => res.status(400).send(error));
  }
  logout(req, res) {
    req.headers['x-access-token'] = null;
    req.decoded = null;
    res.status(204).send({message: 'User logged out.'});
  }
}
exports.User = User;
