const express = require('express');
const {
  getAllCategories,
} = require('./controllers/getAllCategories.controller');
const { getAllUsers } = require('./controllers/getAllUsers.controller');
const {
  defaultErr,
  notFound,
  alreadyErrs,
  invalidInputSyntax,
  queryKeyDoesntExist,
  queryKeyNotSupported,
  usernameDoesntExist,
  queryInvalidSyntax,
} = require('./controllers/errors.controller');
const { getReviewById } = require('./controllers/getReviewById.controller');
const { patchReviewById } = require('./controllers/patchReviewById.controller');
const { getAllReviews } = require('./controllers/getAllReviews.controller');
const {
  deleteCommentById,
} = require('./controllers/deleteCommentById.controller');
const {
  postCommentByReviewId,
} = require('./controllers/postCommentByReviewId.controller');
const {
  getCommentsByReviewId,
} = require('./controllers/getCommentsByReviewId.controller');
const { getAllApi } = require('./controllers/getAllApi.controller');
const cors = require('cors');

const app = express();
app.use(cors());
app.use('/', express.static('public'));
app.use(express.json());

// Endpoints
app.get('/api', getAllApi);
app.get('/api/categories', getAllCategories);
app.get('/api/reviews', getAllReviews);
app.get('/api/reviews/:review_id', getReviewById);
app.get('/api/reviews/:review_id/comments', getCommentsByReviewId);
app.get('/api/users', getAllUsers);

app.patch('/api/reviews/:review_id', patchReviewById);
app.post('/api/reviews/:review_id/comments', postCommentByReviewId);
app.delete('/api/comments/:comment_id', deleteCommentById);
app.get('/*', notFound);

// Errors
app.use(alreadyErrs);
app.use(invalidInputSyntax);
app.use(queryKeyNotSupported);
app.use(queryInvalidSyntax);
app.use(queryKeyDoesntExist);
app.use(usernameDoesntExist);
app.use(defaultErr);

// TEST

module.exports = app;
