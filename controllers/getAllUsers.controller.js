const { getUsers } = require('../models/getAllUsers.model');

exports.getAllUsers = (req, res, next) => {
  getUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
      next(err);
    });
};
