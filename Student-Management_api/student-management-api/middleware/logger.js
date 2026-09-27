// middleware/logger.js
// -----------------------------------------------------------------------
// Custom Logger Middleware (Functional Requirement #3)
// Logs the HTTP method, the request URL, and a timestamp for every
// incoming request, then passes control to the next middleware/route.
// -----------------------------------------------------------------------

function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
}

module.exports = logger;
