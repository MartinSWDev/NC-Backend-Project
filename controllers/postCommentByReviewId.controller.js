const { postComment } = require('../models/postCommentByReviewId.model');

exports.postCommentByReviewId = (req, res, next) => {
  const reviewId = req.params.review_id;
  const comment = req.body.body;
  const author = req.body.username;
  if (reviewId === undefined || comment === undefined || author === undefined) {
    next({ status: 400, msg: 'Invalid input, missing key or value' });
  }

  if (
    typeof +reviewId !== 'number' ||
    typeof comment !== 'string' ||
    typeof author !== 'string'
  ) {
    next({ status: 400, msg: 'Invalid post data input' });
  }

  postComment(reviewId, comment, author)
    .then((posted) => {
      res.status(201).send({ posted });
    })
    .catch((err) => {
      next(err);
    });
};
