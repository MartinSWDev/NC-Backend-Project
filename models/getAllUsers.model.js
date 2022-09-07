const db = require('../db/connection');
exports.getUsers = () => {
  return db
    .query(
      `
    SELECT * FROM users
    `
    )
    .then((users) => {
      return users.rows;
    });
};
