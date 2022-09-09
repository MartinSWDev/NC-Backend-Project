const { getCategories } = require('../models/getAllCategories.model');
const { getReviews } = require('../models/getReviews.model');

exports.getAllReviews = async (req, res, next) => {
  if (
    Object.keys(req.query).length > 0 &&
    Object.keys(req.query)[0] !== 'category'
  ) {
    next('Query not supported');
  }

  const category = req.query.category;
  let categoryToQuery = '';
  if (category) {
    const categories = await getCategories();
    for (const cat of categories) {
      if (category === cat.slug) {
        categoryToQuery = cat.slug;
      }
    }
  }

  if (category && categoryToQuery.length === 0) {
    next('Query category does not exist');
  }
  getReviews(categoryToQuery)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
};
