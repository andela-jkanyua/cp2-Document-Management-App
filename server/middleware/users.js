const Role = require('../models').Role;

module.exports = (app) => {
  app.get('/users', function(req, res, next) {
    Role.findById(req.decoded.user.roleId)
    .then((role) => {
      if(!role.isAdmin) {
        return res.status(403).send({ success: false, message: 'Admin Users Only' });
      } else {
        next();
      }
    })
  });

  app.use('/users/:userId', function(req, res, next) {
    Role.findById(req.decoded.user.roleId)
    .then((role) =>{
      if(parseInt(req.decoded.user.id)===parseInt(req.params.userId) || role.isAdmin){      
        next();
      } else {
        return res.status(403).send({ success: false, message: 'Owner or Admin Users Only' });
      }
    })
  })
}
