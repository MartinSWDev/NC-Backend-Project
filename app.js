const express = require('express');
const {
  getAllCategories,
} = require('./controllers/getAllCategories.controller');
const { getAllUsers } = require('./controllers/getAllUsers.controller');
const { defaultErr, notFound } = require('./controllers/errors.controller');

const app = express();

// Endpoints
app.get('/api/categories', getAllCategories);
app.get('/api/users', getAllUsers);
app.get('/*', notFound);

// Errors
app.use(defaultErr);

module.exports = app;
