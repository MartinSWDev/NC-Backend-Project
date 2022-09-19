const { deleteComment } = require('../models/deleteComment.model');

exports.deleteCommentById = (req, res, next) => {
  const idToDelete = req.params.comment_id;
  deleteComment(idToDelete)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
