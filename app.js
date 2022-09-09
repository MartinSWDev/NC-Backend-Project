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
} = require('./controllers/errors.controller');
const { getReviewById } = require('./controllers/getReviewById.controller');
const { patchReviewById } = require('./controllers/patchReviewById.controller');
const { getAllReviews } = require('./controllers/getAllReviews.controller');

const app = express();
app.use(express.json());

// Endpoints
app.get('/api/categories', getAllCategories);
app.get('/api/reviews/:review_id', getReviewById);
app.get('/api/users', getAllUsers);
app.patch('/api/reviews/:review_id', patchReviewById);
app.get('/api/reviews', getAllReviews);
app.get('/*', notFound);

// Errors
app.use(alreadyErrs);
app.use(invalidInputSyntax);
app.use(queryKeyNotSupported);
app.use(queryKeyDoesntExist);
app.use(defaultErr);

// TEST

module.exports = app;
