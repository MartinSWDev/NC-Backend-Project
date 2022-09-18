const {
  getCommentsWithReviewId,
} = require('../models/getCommentsWithReviewId.model');

exports.getCommentsByReviewId = (req, res, next) => {
  const review_id = req.params.review_id;
  getCommentsWithReviewId(review_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
