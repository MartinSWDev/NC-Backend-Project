const db = require('../db/connection');

exports.deleteComment = (comment_id) => {
  if (comment_id >= 2147483647) {
    return Promise.reject({
      status: 400,
      msg: `Comment_id:${comment_id} is too large`,
    });
  } else {
    return db
      .query(`DELETE FROM comments WHERE comment_id = $1 RETURNING*;`, [
        comment_id,
      ])
      .then(({ rows }) => {
        const comment = rows[0];
        if (!comment) {
          return Promise.reject({
            status: 404,
            msg: `Comment_id does not exist`,
          });
        }
        return;
      });
  }
};
