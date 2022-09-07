const { patchReview } = require('../models/patchReviewById.model');

exports.patchReviewById = (req, res, next) => {
  const reviewId = req.params.review_id;
  const voteChange = req.body.inc_votes;
  if (reviewId === undefined || voteChange === undefined) {
    next({ status: 400, msg: 'Invalid input, missing key or value' });
  }
  patchReview(reviewId, voteChange)
    .then((updated) => {
      res.status(200).send({ updated });
    })
    .catch((err) => {
      next(err);
    });
};
