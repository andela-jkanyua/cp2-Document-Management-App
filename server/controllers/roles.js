const Roles = require('../models').Role;

class Role {
  create(req, res) {
    return Roles
      .create({
        title: req.body.title,
        description: req.body.description,
        isAdmin: req.body.isAdmin,
      })
      .then(role => res.status(201).send(role))
      .catch(error => res.status(400).send(error));
  }
  list(req, res) {
    return Roles
    .all()
    .then(role => res.status(200).send(role))
    .catch(error => res.status(400).send(error));
  }
};
exports.Role = Role; 