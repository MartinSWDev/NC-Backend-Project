const { getReview } = require('../models/getReviewById.model');

exports.getReviewById = (req, res, next) => {
  const review_id = req.params.review_id;
  getReview(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch((err) => {
      next(err);
    });
};
