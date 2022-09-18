const db = require('../db/connection');
exports.postComment = (reviewId, comment, author) => {
  if (reviewId >= 2147483647) {
    return Promise.reject({
      status: 400,
      msg: `Review_id:${reviewId} is too large`,
    });
  } else {
    console.log('here');
    return db
      .query(
        `INSERT INTO comments (body, author, review_id) VALUES ($1, $2, $3) RETURNING *`,
        [comment, author, reviewId]
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
