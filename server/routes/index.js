const { Users, Documents, Roles } = require('../controllers');


// API ROUTE =================;
module.exports = (app) => {
  // AUTHENTICATION
  app.post('/api/login', Users.login);
  //  Using a POST not GET because browsers will pre-fetch pages they "think" you will visit next.
  app.post('/api/logout', Users.logout);
  app.post('/api/users', Users.create);
  app.get('/api/documents', Documents.list); // public docs only
  require('../middleware/auth')(app);


  // USERS ENDPOINTS =================;
  require('../middleware/users')(app);
  app.get('/api/users', Users.list);
  app.get('/api/search/users', Users.findAll);
  app.get('/api/users/:userId', Users.retrieve);
  app.put('/api/users/:userId', Users.update);
  app.delete('/api/users/:userId', Users.destroy);


  // DOCUMENTS ENDPOINTS ==============;
  require('../middleware/documents')(app);
  app.post('/api/documents', Documents.create);
  app.get('/api/documents/:docId', Documents.retrieve); // owner and admins only
  app.put('/api/documents/:docId', Documents.update); // owner only
  app.delete('/api/documents/:docId', Documents.destroy); // owner only
  app.get('/api/users/:userId/documents', Documents.retrieveUserDocuments); // owner or admin only
  app.get('/api/search/documents', Documents.findAll);

  // ROUTES ENDPOINTS ==============;
  require('../middleware/roles')(app);
  app.post('/api/roles', Roles.create);
  app.get('/api/roles', Roles.list);
};
