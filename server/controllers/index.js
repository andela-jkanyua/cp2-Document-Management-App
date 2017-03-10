const DocumentsController = require('./documents').Document;
const UsersController = require('./users').User;
const RolesController = require('./roles').Role;

const Documents = new DocumentsController;
const Users = new UsersController;
const Roles = new RolesController;

module.exports = {
  Users,
  Documents,
  Roles,
};
