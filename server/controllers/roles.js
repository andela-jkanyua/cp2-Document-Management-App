const Roles = require('../models').Role;

/**
 * Represents a Role.
 */
class Role {
  /**
  * Creates a role
  * @param {Object} req Incoming HTTP request.
  * @param {Object} res Outgoing HTTP response.
  * @returns {object} created role object.
  */
  static create(req, res) {
    return Roles
      .create({
        title: req.body.title,
        description: req.body.description,
        isAdmin: req.body.isAdmin,
      })
      .then(role => res.status(201).send(role))
      .catch(error => res.status(400).send(error));
  }
  /**
  * list roles
  * @param {Object} req Incoming HTTP request.
  * @param {Object} res Outgoing HTTP response.
  * @returns {array} roles.
  */
  static list(req, res) {
    return Roles
    .all()
    .then(role => res.status(200).send(role))
    .catch(error => res.status(400).send(error));
  }
}
exports.Role = Role;
