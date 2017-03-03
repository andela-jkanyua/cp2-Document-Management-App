const Users = require('../models').Users;
const Documents = require('../models').Documents;
const jwt    = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const secret = process.env.SECRET;

module.exports = {
  login(req, res) {
    if(!(req.body.email && req.body.password)){
      return res.status(400).json({success: false, message: 'User Email and Password required.'})
    }
    Users.find({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User Not Found',
        });
      } else if (user){
        bcrypt.compare(req.body.password, user.password, function(err, auth) {
          if (!auth){
            res.status(401).json({success:false, message: 'Authentication Failed. Wrong Password'});
          } else {
            const token = jwt.sign({user: user}, secret, 
            {
            expiresIn : '24h'
          });
            return res.json({success: true, message: 'Authenticated', token: token});
          }
        });
      }
    })
    .catch(error => res.status(400).send(error));
  },
  create(req, res) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        Users.create({
          email: req.body.email,
          password: hash,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          roleId: req.body.roleId,
        })
      .then(user => res.status(201).send({message:`User email:, ${user.email} Created!`, success: true}))
      .catch(error => res.status(400).send(error));
    });
    });
  },
  list(req, res) {
    return Users
    .all(
    {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }
    })
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Users
    .findById(req.params.userId, {
      
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt']
    
      },
      include: [{
        model: Documents,
      }],
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      return res.status(200).send(user);
    })
    .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Users
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: 'User Not Found',
        });
      }
      return user
        .update({
          email: req.body.email || user.email,
          password: req.body.password || user.password,
          firstName: req.body.firstName || user.firstName,
          lastName: req.body.lastName || user.lastName,
          roleId: req.body.roleId || user.roleId,
        })
        .then(() => res.status(200).send(user))  // Send back the updated user.
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Users
    .findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(400).send({
          message: 'User Not Found',
        });
      }
      return user
        .destroy()
        .then(() => res.status(204).send(user))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
};
