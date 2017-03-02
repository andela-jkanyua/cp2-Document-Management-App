const usersController = require('../controllers').users;
const documentsController = require('../controllers').documents;
const rolesController = require('../controllers').roles;
// API ROUTE =================;
module.exports = (app) => {
  app.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the DMA API!',
  }));

  //AUTHENTICATION
  app.post('/login', usersController.login);
  app.post('/users', usersController.create); 

  require('../middleware/auth')(app);


  // USERS ENDPOINTS =================;
  require('../middleware/users')(app);
  app.get('/users', usersController.list);
  app.get('/users/:userId', usersController.retrieve);
  app.put('/users/:userId', usersController.update);
  app.delete('/users/:userId', usersController.destroy);


  // DOCUMENTS ENDPOINTS ==============;
  require('../middleware/documents')(app);
  app.post('/documents', documentsController.create);
  app.get('/documents', documentsController.list); //public docs only
  app.get('/documents/:docId', documentsController.retrieve); //owner and admins only
  app.put('/documents/:docId', documentsController.update); // owner only
  app.delete('/documents/:docId', documentsController.destroy);// owner only
  app.get('/users/:userId/documents', documentsController.retrieveUserDocuments);// owner or admin only
  app.post('/search/documents', documentsController.findAll);

  // ROUTES ENDPOINTS ==============;
  require('../middleware/roles')(app); 
  app.post('/roles', rolesController.create);
  app.get('/roles', rolesController.list);
};
