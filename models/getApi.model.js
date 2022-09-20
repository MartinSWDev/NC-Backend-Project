const endpoints = require('../endpoints.json');

exports.getApi = async () => {
  return endpoints;
};
