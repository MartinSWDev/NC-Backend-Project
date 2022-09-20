const db = require('../db/connection');
exports.getReviews = (category, sort_by, order) => {
  category = category.replaceAll(/\'{1}/g, "''");
  let placeholder = `SELECT reviews.*, COUNT(comments.review_id)::int AS comment_count FROM reviews
    LEFT JOIN comments ON reviews.review_id = comments.review_id`;
  if (category) {
    placeholder += ` WHERE category = '${category}' `;
  }
  placeholder += `
    GROUP BY reviews.review_id 
    `;
  if (sort_by) {
    placeholder += ` ORDER BY reviews.${sort_by}`;
  } else {
    placeholder += ' ORDER BY reviews.created_at';
  }
  if (order) {
    placeholder += ` ${order}`;
  } else {
    placeholder += ' DESC';
  }
  return db.query(placeholder).then((reviews) => {
    return reviews.rows;
  });
};
