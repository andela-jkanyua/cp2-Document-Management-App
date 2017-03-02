const Role = require('../models').Role;
const Documents = require('../models').Documents;
module.exports = (app) => {
  app.get('/users/:userId/documents', function(req, res, next) {
    Role.findById(req.decoded.user.roleId)
    .then((role) => {
      if(parseInt(req.decoded.user.id)===parseInt(req.params.userId) || role.isAdmin){
        next()  
      }else {
        return res.status(403).send({ success: false, message: 'Owner or Admin Users Only' });
      }
    })
  });
  app.delete('/documents/:docId', function(req, res, next) {
    Documents.findById(parseInt(req.params.docId))
    .then((doc) =>{
      Role.findById(req.decoded.user.roleId)
      .then((role) => {
      if(parseInt(req.decoded.user.id)===parseInt(doc.userId) || role.isAdmin){
        next()
      } else {
        return res.status(403).send({ success: false, message: 'Only Owner can delete' });
      }
    })
    })
  });
  app.put('/documents/:docId', function(req, res, next) {
    Documents.findById(parseInt(req.params.docId))
    .then((doc) =>{
      if(parseInt(req.decoded.user.id)===parseInt(doc.userId)){
        next()
      } else {
        return res.status(403).send({ success: false, message: 'Only Owner can modify' });
      }
    })
  });  
}
