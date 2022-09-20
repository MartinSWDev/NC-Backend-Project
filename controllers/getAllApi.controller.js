const { getApi } = require('../models/getApi.model');

exports.getAllApi = (req, res, next) => {
  getApi()
    .then((endpoints) => {
      res.status(200).json({ endpoints });
    })
    .catch((err) => {
      next(err);
    });
};
