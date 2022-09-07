function notFound(req, res) {
  res.status(404).send({ msg: 'Endpoint not found' });
}

function alreadyErrs(err, req, res, next) {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    return next(err);
  }
}

function invalidInputSyntax(err, req, res, next) {
  if (err.code === '22P02') {
    res.status(400).send({ msg: 'Invalid input syntax' });
  } else {
    next(err);
  }
}

function defaultErr(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
}

module.exports = {
  defaultErr,
  alreadyErrs,
  notFound,
  invalidInputSyntax,
};
