const db = require('../db/connection');
exports.getCommentsWithReviewId = (review_id) => {
  if (review_id >= 2147483647) {
    return Promise.reject({
      status: 400,
      msg: `Review_id:${review_id} is too large`,
    });
  } else {
    return db
      .query(`SELECT * FROM comments WHERE review_id = $1`, [review_id])
      .then((result) => {
        if (result.rows.length === 0) {
          return Promise.reject({
            status: 404,
            msg: `Review_id:${review_id} does not exist`,
          });
        }
        return result.rows;
      });
  }
};
