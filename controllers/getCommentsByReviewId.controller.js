const {
  getCommentsWithReviewId,
} = require('../models/getCommentsWithReviewId.model');
const { getReview } = require('../models/getReviewById.model');

exports.getCommentsByReviewId = (req, res, next) => {
  const review_id = req.params.review_id;
  getReview(review_id)
    .then(() => {
      getCommentsWithReviewId(review_id)
        .then((comments) => {
          if (comments.length === 0) {
            res.status(200).send({ comments: [] });
          } else {
            res.status(200).send({ comments });
          }
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};
