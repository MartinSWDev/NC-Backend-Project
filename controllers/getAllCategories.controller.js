const { getCategories } = require('../models/getCategories.model');

exports.getAllCategories = (req, res, next) => {
  getCategories()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      next(err);
    });
};
