const Role = require('../models').Role;

const Documents = require('../models').Documents;

module.exports = (app) => {
  app.use('/users/:userId/documents', (req, res, next) => {
    Role.findById(req.decoded.user.roleId)
    .then((role) => {
      if (parseInt(req.decoded.user.id, 10) === parseInt(req.params.userId, 10) || role.isAdmin) {
        next();
      } else {
        return res.status(403).send({ success: false, message: 'Only Owner or Admin can access this Document' });
      }
    });
  });
  app.use('/documents/:docId', (req, res, next) => {
    Documents.findById(parseInt(req.params.docId, 10))
    .then((doc) => {
      if(!doc){
        return res.status(403).send({success: false, message: 'No such Document'});
      }
      Role.findById(req.decoded.user.roleId)
      .then((role) => {
        if (parseInt(req.decoded.user.id, 10) === parseInt(doc.userId, 10) || role.isAdmin ) {
          next();
        } else {
          return res.status(403).send({ success: false, message: 'Only Owner or Admin can modify' });
        }
      });
    });
  });
};
