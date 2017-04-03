const Documents = require('../models').Documents;
const Users = require('../models').Users;

/**
 * Represents a Document.
 */
class Document {
  /**
  * Creates a new Document
  * @param {Object} req Incoming HTTP request.
  * @param {Object} res Outgoing HTTP response.
  * @returns {Object} the created document.
  */
  static create(req, res) {
    return Documents
      .create({
        title: req.body.title,
        content: req.body.content,
        dateCreated: req.body.dateCreated,
        userId: req.decoded.user.id || req.body.userId,
        access: req.body.access,
      })
      .then(documents => res.status(201).send(documents))
      .catch(error => res.status(400).send(error));
  }

  /**
  * Lists all public documents
  * @param {Object} req Incoming HTTP request.
  * @param {Object} res Outgoing HTTP response.
  * @returns {array} array of document objects.
  */
  static list(req, res) {
    if (!(req.query.limit && req.query.offset)) {
      return Documents
      .findAll({ where: { access: 'public' },
        include: [{
          model: Users,
          attributes: {
            exclude: ['password', 'createdAt', 'updatedAt'], },
        }],
      })
      .then(users => res.status(200).send(users))
      .catch(error => res.status(400).send(error));
    }
    if (isNaN(parseInt(req.query.limit, 10)) || isNaN(parseInt(req.query.offset, 10))) {
      return res.status(400).send({ success: false, message: 'Query Parameters are not Integers.' });
    }
    Documents.findAll({ where: { access: 'public' },
      include: [{
        model: Users,
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      }],
      offset: req.query.offset,
      limit: req.query.limit
    })
    .then(usr => res.status(200).send(usr))
    .catch(error => res.status(400).send(error));
  }

  /**
  * Gets a user's documents
  * @param {Object} req Incoming HTTP request.
  * @param {Object} res Outgoing HTTP response.
  * @returns {array} object of user's document.
  */
  static retrieveUserDocuments(req, res) {
    return Documents
    .findAll({ where: { userId: req.params.userId },
      include: [{
        model: Users,
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      }],
     })
    .then((document) => {
      if (document.length==0) {
        return res.status(404).send({
          message: 'User has no Documents',
        });
      }
      return res.status(200).send(document);
    })
    .catch(error => res.status(400).send(error));
  }

  /**
  * Gets a specific document
  * @param {Object} req Incoming HTTP request.
  * @param {Object} res Outgoing HTTP response.
  * @returns {object} document object.
  */
  static retrieve(req, res) {
    return Documents
    .findById(req.params.docId)
    .then((doc) => {
      return res.status(200).send(doc);
    })
    .catch(error => res.status(400).send(error));
  }

  /**
  * Update a document
  * @param {Object} req Incoming HTTP request.
  * @param {Object} res Outgoing HTTP response.
  * @returns {object} updated document object.
  */
  static update(req, res) {
    return Documents
    .find({ where: {id: req.params.docId},
      include: [{
        model: Users,
        attributes: {
          exclude: ['password', 'createdAt', 'updatedAt'],
        },
      }],
    })
    .then((doc) => {
      if (!doc) {
        return res.status(404).send({
          message: 'Document Cannot be Found and Updated',
        });
      }
      return doc
        .update({
          title: req.body.title || doc.title,
          content: req.body.content || doc.content,
          dateCreated: req.body.dateCreated || doc.dateCreated,
          access: req.body.access || doc.access,
        })
        .then(() => res.status(200).send(doc))  // Send back the updated document.
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }

  /**
  * Delete a document
  * @param {Object} req Incoming HTTP request.
  * @param {Object} res Outgoing HTTP response.
  * @returns {object} deleted document object.
  */
  static destroy(req, res) {
    return Documents
    .findById(req.params.docId)
    .then((doc) => {
      if (!doc) {
        return res.status(400).send({
          message: 'Document Not Found',
        });
      }
      return doc
        .destroy()
        .then(() => res.status(204).send(doc))
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  }

  /**
  * Find a document
  * @param {Object} req Incoming HTTP request.
  * @param {Object} res Outgoing HTTP response.
  * @returns {object} selected document object.
  */
  static findAll(req, res) {
    return Documents
    .findAll({
      where: {
        $or: [
          {
            title: { $iLike: `%${req.query.q}%` },
          },
          {
            content: { $iLike: `%${req.query.q}%` },
          },
        ],
      },
    })
    .then((document) => {
      if (document.length < 1) {
        return res.status(404).send({
          message: 'No Documents found.',
        });
      }
      return res.status(200).send(document);
    })
    .catch(error => res.status(400).send(error));
  }
}
exports.Document = Document;
