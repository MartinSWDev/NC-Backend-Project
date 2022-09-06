const db = require('../db/connection');
exports.getCategories = () => {
  return db
    .query(
      `
        SELECT * FROM categories
    `
    )
    .then((results) => {
      return results.rows;
    });
};
