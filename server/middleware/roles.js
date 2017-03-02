const Role = require('../models').Role;

module.exports = (app) => {
// route middleware to verify an admin 
  app.use('/roles', function(req, res, next) {
    Role.findById(req.decoded.user.roleId)
    .then((role) => {
      if(!role.isAdmin) {
        return res.status(403).send({ success: false, message: 'Admin Users Only' });
      }else{
        next();
      }
    })
  });
}