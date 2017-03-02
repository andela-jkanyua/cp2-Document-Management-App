const Documents = require('../models').Documents;

module.exports = {
  create(req, res) {
    return Documents
      .create({
        title: req.body.title,
        content: req.body.content,
        dateCreated: req.body.dateCreated,
        userId: req.body.userId,
      })
      .then(documents => res.status(201).send(documents))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Documents
    .findAll({where: {access: 'public'}})
    .then(users => res.status(200).send(users))
    .catch(error => res.status(400).send(error));
  },
  retrieveUserDocuments(req, res) {
    return Documents
    .findAll({ where: { userId: req.params.userId } })
    .then((document) => {
      if (!document) {
        return res.status(404).send({
          message: 'User has no Documents',
        });
      }
      return res.status(200).send(document);
    })
    .catch(error => res.status(400).send(error));
  },
  retrieve(req, res) {
    return Documents
    .findById(req.params.docId)
    .then((doc) => {
      if (!doc) {
        return res.status(404).send({
          message: 'Document Not Found',
        });
      }
      return res.status(200).send(doc);
    })
    .catch(error => res.status(400).send(error));
  },
  update(req, res) {
    return Documents
    .findById(req.params.docId)
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
        })
        .then(() => res.status(200).send(doc))  // Send back the updated document.
        .catch(error => res.status(400).send(error));
    })
    .catch(error => res.status(400).send(error));
  },
  destroy(req, res) {
    return Documents
    .findById(req.params.docId)
    .then((doc) => {
      if (!doc) {
        return res.status(400).send({
          message: 'Document Not Found',
        });
      }
      return res.status(204).send(doc);
    })
    .catch(error => res.status(400).send(error));
  },
  findAll(req, res) {
    return Documents
    .findAll({
      where: {
        $or: [
          {
            title: { $iLike: `%${req.body.search}%` },
          },
          {
            content: { $iLike: `%${req.body.search}%` },
          },
        ],
      },
    })
    .then((document) => {
      if (!Documents) {
        return res.status(404).send({
          message: 'No Documents',
        });
      }
      return res.status(200).send(document);
    })
    .catch(error => res.status(400).send(error));
  },
};
