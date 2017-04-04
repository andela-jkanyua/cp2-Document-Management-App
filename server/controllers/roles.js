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
    if (req.body.title === undefined || req.body.isAdmin === undefined) {
      return res.status(400)
      .send({
        success: false,
        message: 'Provide role \'title\' and \'isAdmin\' fields',
      });
    }
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
  /**
  * Delete a User
  * @param {Object} req Incoming HTTP request.
  * @param {Object} res Outgoing HTTP response.
  * @returns {object} deleted user object.
  */
  static destroy(req, res) {
    return Roles
    .findById(req.params.roleId)
    .then((role) => {
      if (!role) {
        return res.status(404).send({
          success: false,
          message: 'Role Not Found',
        });
      }
      return role
        .destroy()
        .then(() => res.status(204).send(role))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }
  /**
  * Updates a User
  * @param {Object} req Incoming HTTP request.
  * @param {Object} res Outgoing HTTP response.
  * @returns {object} HTTP response.
  */
  static update(req, res) {
    return Roles
    .findById(req.params.roleId)
    .then((role) => {
      if (!role) {
        return res.status(404).send({
          success: false,
          message: 'Role Not Found',
        });
      }
      return role
        .update({
          title: req.body.title || role.email,
          description: req.body.description || role.description,
          isAdmin: req.body.isAdmin || role.isAdmin,
        })
        .then(() => res.status(200).send(role))  // Send back the updated user.
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }
}
exports.Role = Role;
