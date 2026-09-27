// routes/studentRoutes.js
// -----------------------------------------------------------------------
// Modular Routing (Functional Requirement #4)
// All /students endpoints live here and are mounted onto the main app
// inside app.js using: app.use("/students", studentRoutes)
//
// Every handler is wrapped in try/catch so that even an UNEXPECTED error
// (a bug, bad input shape, etc.) is caught and forwarded to the central
// error handler as a clean JSON response instead of crashing the server.
// -----------------------------------------------------------------------

const express = require("express");
const router = express.Router();

const {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
} = require("../data/students");

// -------------------- Helper: simple input validation --------------------
function validateStudentInput(body, { partial = false } = {}) {
  const errors = [];
  const { name, course, age, email } = body || {};

  if (!partial || name !== undefined) {
    if (!name || typeof name !== "string" || name.trim() === "") {
      errors.push("'name' is required and must be a non-empty string.");
    }
  }
  if (!partial || course !== undefined) {
    if (!course || typeof course !== "string" || course.trim() === "") {
      errors.push("'course' is required and must be a non-empty string.");
    }
  }
  if (age !== undefined && (typeof age !== "number" || age <= 0)) {
    errors.push("'age' must be a positive number.");
  }
  if (email !== undefined && typeof email !== "string") {
    errors.push("'email' must be a string.");
  }

  return errors;
}

// -------------------- GET /students - get all students --------------------
router.get("/", (req, res, next) => {
  try {
    const students = getAllStudents();
    res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (err) {
    next(err); // unexpected error -> centralized error handler -> clean JSON, no crash
  }
});

// -------------------- GET /students/:id - get one student --------------------
router.get("/:id", (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      const error = new Error("Student id must be a number.");
      error.statusCode = 400;
      throw error;
    }

    const student = getStudentById(id);

    if (!student) {
      const error = new Error(`Student with id ${id} not found.`);
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: student });
  } catch (err) {
    next(err);
  }
});

// -------------------- POST /students - create a student --------------------
router.post("/", (req, res, next) => {
  try {
    const errors = validateStudentInput(req.body);

    if (errors.length > 0) {
      const error = new Error(errors.join(" "));
      error.statusCode = 400;
      throw error;
    }

    const newStudent = addStudent(req.body);

    res.status(201).json({
      success: true,
      message: "Student created successfully.",
      data: newStudent,
    });
  } catch (err) {
    next(err);
  }
});

// -------------------- PUT /students/:id - update a student --------------------
router.put("/:id", (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      const error = new Error("Student id must be a number.");
      error.statusCode = 400;
      throw error;
    }

    const errors = validateStudentInput(req.body, { partial: true });
    if (errors.length > 0) {
      const error = new Error(errors.join(" "));
      error.statusCode = 400;
      throw error;
    }

    const updated = updateStudent(id, req.body);

    if (!updated) {
      const error = new Error(`Student with id ${id} not found.`);
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully.",
      data: updated,
    });
  } catch (err) {
    next(err);
  }
});

// -------------------- DELETE /students/:id - delete a student --------------------
router.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      const error = new Error("Student id must be a number.");
      error.statusCode = 400;
      throw error;
    }

    const deleted = deleteStudent(id);

    if (!deleted) {
      const error = new Error(`Student with id ${id} not found.`);
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully.",
      data: deleted,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
