const db = require('../db/connection');
exports.patchReview = (reviewId, voteChange) => {
  if (reviewId >= 2147483647) {
    return Promise.reject({
      status: 400,
      msg: `Review_id:${reviewId} is too large`,
    });
  } else {
    return db
      .query(
        `UPDATE reviews SET votes = GREATEST(votes + $1, 0) WHERE review_id = $2 Returning *;`,
        [voteChange, reviewId]
      )
      .then(({ rows }) => {
        const review = rows[0];
        if (!review) {
          return Promise.reject({
            status: 404,
            msg: `Review_id:${reviewId} does not exist`,
          });
        }
        return review;
      });
  }
};
