const Users = require('../models').Users;
const Documents = require('../models').Documents;

module.exports = {
  create(req, res) {
    return Users
      .create({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        roleId: req.body.roleId,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Users
    .all()
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Users
    .findById(req.params.userId, {
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
  },
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
  },
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
  },
};
