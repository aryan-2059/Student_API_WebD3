const notFound = (req, res, next) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
};

const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = status === 500 ? "Internal Server Error" : err.message;
  if (status === 500) console.error(err);
  res.status(status).json({ error: message });
};

module.exports = { notFound, errorHandler };