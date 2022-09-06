const express = require('express');
const {
  getAllCategories,
} = require('./controllers/getAllCategories.controller');
const { defaultErr, notFound } = require('./err');

const app = express();

// Endpoints
app.get('/api/categories', getAllCategories);
app.get('/*', notFound);

// Errors
app.use(defaultErr);

module.exports = app;
