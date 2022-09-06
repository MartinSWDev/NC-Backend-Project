const express = require('express');
const {
  getAllCategories,
} = require('./controllers/getAllCategories.controller');
const {
  defaultErr,
  notFound,
  alreadyErrs,
  invalidId,
} = require('./controllers/errors.controller');
const { getReviewById } = require('./controllers/getReviewById.controller');

const app = express();

// Endpoints
app.get('/api/categories', getAllCategories);
app.get('/api/reviews/:review_id', getReviewById);
app.get('/*', notFound);

// Errors
app.use(alreadyErrs);
app.use(invalidId);
app.use(defaultErr);

module.exports = app;
