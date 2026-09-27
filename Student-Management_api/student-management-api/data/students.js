// data/students.js
// -----------------------------------------------------------------------
// Simple data-access layer for the Student Management REST API.
// As per assignment restrictions: NO database (MongoDB/MySQL), NO Mongoose.
// Data lives in memory as a JavaScript ARRAY, seeded from a JSON file, and
// changes are persisted back to that same JSON file so data survives
// server restarts.
// -----------------------------------------------------------------------

const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "students.json");

// Load the JSON file into an in-memory array when the module first loads.
let students = [];

function loadFromDisk() {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    students = JSON.parse(raw);
  } catch (err) {
    console.error("Could not read students.json, starting with empty array.", err.message);
    students = [];
  }
}

function saveToDisk() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(students, null, 2), "utf-8");
  } catch (err) {
    console.error("Could not write to students.json:", err.message);
  }
}

// Initial load
loadFromDisk();

// ---------- Helper functions used by the routes (CRUD operations) ----------

// CREATE: generates a new id and adds a student to the array
function getNextId() {
  if (students.length === 0) return 1;
  return Math.max(...students.map((s) => s.id)) + 1;
}

function getAllStudents() {
  return students;
}

function getStudentById(id) {
  return students.find((s) => s.id === Number(id));
}

function addStudent(studentData) {
  const newStudent = {
    id: getNextId(),
    name: studentData.name,
    course: studentData.course,
    age: studentData.age,
    email: studentData.email,
  };
  students.push(newStudent);
  saveToDisk();
  return newStudent;
}

function updateStudent(id, updatedFields) {
  const student = getStudentById(id);
  if (!student) return null;

  student.name = updatedFields.name ?? student.name;
  student.course = updatedFields.course ?? student.course;
  student.age = updatedFields.age ?? student.age;
  student.email = updatedFields.email ?? student.email;

  saveToDisk();
  return student;
}

function deleteStudent(id) {
  const index = students.findIndex((s) => s.id === Number(id));
  if (index === -1) return null;

  const deleted = students.splice(index, 1)[0];
  saveToDisk();
  return deleted;
}

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
};
