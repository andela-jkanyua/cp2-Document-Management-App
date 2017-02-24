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
   app.get('/users', usersController.list);
  require('../middleware/auth')(app);

  // USERS ENDPOINTS =================;
  
 
  app.get('/users/:userId', usersController.retrieve);
  app.put('/users/:userId', usersController.update);
  app.delete('/users/:userId', usersController.destroy);


  // DOCUMENTS ENDPOINTS ==============;
  app.post('/documents', documentsController.create);
  app.get('/documents', documentsController.list);
  app.get('/documents/:docId', documentsController.retrieve);
  app.put('/documents/:docId', documentsController.update);
  app.delete('/documents/:docId', documentsController.destroy);
  app.get('/users/:userId/documents', documentsController.retrieveUserDocuments);
  app.post('/search/documents', documentsController.findAll);

  // ROUTES ENDPOINTS ==============;
  app.post('/roles', rolesController.create);
  app.get('/roles', rolesController.list);
};
