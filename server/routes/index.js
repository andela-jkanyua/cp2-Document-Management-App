const {Users, Documents, Roles} = require('../controllers');


// API ROUTE =================;
module.exports = (app) => {

  // AUTHENTICATION
  app.post('/login', Users.login);
  app.post('/users', Users.create);

  require('../middleware/auth')(app);


  // USERS ENDPOINTS =================;
  require('../middleware/users')(app);
  app.get('/users', Users.list);
  app.get('/users/:userId', Users.retrieve);
  app.put('/users/:userId', Users.update);
  app.delete('/users/:userId', Users.destroy);


  // DOCUMENTS ENDPOINTS ==============;
  require('../middleware/documents')(app);
  app.post('/documents', Documents.create);
  app.get('/documents', Documents.list); // public docs only
  app.get('/documents/:docId', Documents.retrieve); // owner and admins only
  app.put('/documents/:docId', Documents.update); // owner only
  app.delete('/documents/:docId', Documents.destroy); // owner only
  app.get('/users/:userId/documents', Documents.retrieveUserDocuments); // owner or admin only
  app.post('/search/documents', Documents.findAll);

  // ROUTES ENDPOINTS ==============;
  require('../middleware/roles')(app);
  app.post('/roles', Roles.create);
  app.get('/roles', Roles.list);
  app.get('*', (req, res) => res.status(200).send({

    //TODO: REDIRECT TO PUBLIC INDEX.HTML
    message: 'Welcome to the DMA API!',
  }));
};
