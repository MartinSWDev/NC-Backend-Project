function notFound(req, res) {
  res.status(404).send({ err: 'Endpoint not found' });
}

function defaultErr(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}

module.exports = { defaultErr, notFound };
