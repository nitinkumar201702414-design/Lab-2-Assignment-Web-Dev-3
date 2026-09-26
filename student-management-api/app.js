// app.js
// -----------------------------------------------------------------------
// Lab Assignment 2 - Student Management REST API
// Web Dev III (Node.js & Express Backend) | Unit-2 | In-Class Lab
//
// Functional Requirements covered here:
// 1. Create Express Server
// 3. Implement Custom Logger Middleware  (see middleware/logger.js)
// 4. Use Modular Routing                 (see routes/studentRoutes.js)
// 5. Handle Errors Properly               (see middleware/errorHandler.js)
// -----------------------------------------------------------------------

const express = require("express");
const logger = require("./middleware/logger");
const { notFound, errorHandler } = require("./middleware/errorHandler");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// -------------------- Global Middleware --------------------
app.use(express.json()); // parse JSON request bodies
app.use(logger); // custom logger middleware - logs every request

// -------------------- Root route --------------------
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Student Management REST API is running.",
    endpoints: {
      "GET /students": "Get all students",
      "GET /students/:id": "Get a single student by id",
      "POST /students": "Create a new student",
      "PUT /students/:id": "Update an existing student",
      "DELETE /students/:id": "Delete a student",
    },
  });
});

// -------------------- Routes (Modular Routing) --------------------
app.use("/students", studentRoutes);

// -------------------- Error Handling --------------------
app.use(notFound); // catches unknown routes -> 404
app.use(errorHandler); // catches all errors -> proper status codes

// -------------------- Start Server --------------------
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
