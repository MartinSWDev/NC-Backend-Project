const { getCategories } = require('../models/getAllCategories.model');
const { getReviews } = require('../models/getReviews.model');

exports.getAllReviews = async (req, res, next) => {
  let categoryToQuery = '';
  let sortByQuery = '';
  let orderQuery = '';

  // if there are queries
  if (Object.keys(req.query).length > 0) {
    const queries = Object.keys(req.query);
    const acceptQueries = ['category', 'sort_by', 'order'];

    // make sure the queries keys are acceptable
    const accept = acceptQueries.some((keys) => queries.includes(keys));
    if (!accept) {
      next('Query not supported');
    } else {
      // sort by
      if (req.query.sort_by) {
        const acceptSortBy = [
          'owner',
          'title',
          'review_id',
          'category',
          'review_img_url',
          'created_at',
          'votes',
          'designer',
          'comment_count',
        ];
        const acceptSort = acceptSortBy.some((keys) =>
          req.query.sort_by.includes(keys)
        );
        if (acceptSort) {
          sortByQuery = req.query.sort_by;
        } else {
          next('Invalid query syntax');
        }
      }
      // order
      if (req.query.order) {
        const acceptOrder = ['ASC', 'DESC'];
        const acceptOrderCheck = acceptOrder.some((keys) =>
          req.query.order.includes(keys)
        );
        if (acceptOrderCheck) {
          orderQuery = req.query.order;
        } else {
          next('Invalid query syntax');
        }
      }
      // category
      if (req.query.category) {
        const categories = await getCategories();
        for (const cat of categories) {
          if (req.query.category === cat.slug) {
            categoryToQuery = cat.slug;
          }
        }
      }
      // no category exists
      if (req.query.category && categoryToQuery.length === 0) {
        next('Query category does not exist');
      }
    }
  }

  getReviews(categoryToQuery, sortByQuery, orderQuery)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch((err) => {
      next(err);
    });
};
