// routes/studentRoutes.js
// -----------------------------------------------------------------------
// Modular Routing (Functional Requirement #4)
// All /students endpoints live here and are mounted onto the main app
// inside app.js using: app.use("/students", studentRoutes)
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
  const { name, course, age, email } = body;

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
router.get("/", (req, res) => {
  const students = getAllStudents();
  res.status(200).json({
    success: true,
    count: students.length,
    data: students,
  });
});

// -------------------- GET /students/:id - get one student --------------------
router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    const error = new Error("Student id must be a number.");
    error.statusCode = 400;
    return next(error);
  }

  const student = getStudentById(id);

  if (!student) {
    const error = new Error(`Student with id ${id} not found.`);
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({ success: true, data: student });
});

// -------------------- POST /students - create a student --------------------
router.post("/", (req, res, next) => {
  const errors = validateStudentInput(req.body);

  if (errors.length > 0) {
    const error = new Error(errors.join(" "));
    error.statusCode = 400;
    return next(error);
  }

  const newStudent = addStudent(req.body);

  res.status(201).json({
    success: true,
    message: "Student created successfully.",
    data: newStudent,
  });
});

// -------------------- PUT /students/:id - update a student --------------------
router.put("/:id", (req, res, next) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    const error = new Error("Student id must be a number.");
    error.statusCode = 400;
    return next(error);
  }

  const errors = validateStudentInput(req.body, { partial: true });
  if (errors.length > 0) {
    const error = new Error(errors.join(" "));
    error.statusCode = 400;
    return next(error);
  }

  const updated = updateStudent(id, req.body);

  if (!updated) {
    const error = new Error(`Student with id ${id} not found.`);
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({
    success: true,
    message: "Student updated successfully.",
    data: updated,
  });
});

// -------------------- DELETE /students/:id - delete a student --------------------
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    const error = new Error("Student id must be a number.");
    error.statusCode = 400;
    return next(error);
  }

  const deleted = deleteStudent(id);

  if (!deleted) {
    const error = new Error(`Student with id ${id} not found.`);
    error.statusCode = 404;
    return next(error);
  }

  res.status(200).json({
    success: true,
    message: "Student deleted successfully.",
    data: deleted,
  });
});

module.exports = router;
