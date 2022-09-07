const { getCategories } = require('../models/getAllCategories.model');

exports.getAllCategories = (req, res, next) => {
  getCategories()
    .then((categories) => {
      res.status(200).send({ categories });
    })
    .catch((err) => {
      next(err);
    });
};
