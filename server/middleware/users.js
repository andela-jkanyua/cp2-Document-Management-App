const Role = require('../models').Role;

module.exports = (app) => {
  app.use('/api/users/:userId', (req, res, next) => {
    Role.findById(req.decoded.user.roleId)
    .then((role) => {
      if (parseInt(req.decoded.user.id, 10) === parseInt(req.params.userId, 10) || role.isAdmin) {
        next();
      } else {
        return res.status(403).send({ success: false, message: 'Owner or Admin Users Only' });
      }
    });
  });
  app.use('/api/users', (req, res, next) => {
    Role.findById(req.decoded.user.roleId)
    .then((role) => {
      if (!role.isAdmin) {
        return res.status(403).send({ success: false, message: 'Admin Users Only' });
      }
      next();
    });
  });
};
