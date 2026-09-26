// middleware/errorHandler.js
// -----------------------------------------------------------------------
// Centralized error-handling middleware (Functional Requirement #5).
// Any route that calls next(err) will end up here, and any error thrown
// inside an async route (wrapped in try/catch) is forwarded here too.
// -----------------------------------------------------------------------

// 404 handler - for any route that doesn't match
function notFound(req, res, next) {
  const error = new Error(`Route not found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

// General error handler - must be defined with 4 arguments (err, req, res, next)
// so that Express recognizes it as an error-handling middleware.
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;

  console.error(`[ERROR] ${req.method} ${req.originalUrl} -> ${err.message}`);

  res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: err.message || "Internal Server Error",
  });
}

module.exports = { notFound, errorHandler };
