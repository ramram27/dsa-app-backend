function errorHandler(err, req, res, next) {
  console.log("res",err.message)
  const status = err.status || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error',
    // uncomment in dev:
    // stack: err.stack
  });
}

module.exports = errorHandler;
