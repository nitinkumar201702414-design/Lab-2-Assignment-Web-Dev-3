# Student Management REST API

**Lab Assignment 2 — Web Dev III (Node.js & Express Backend)**
Unit-2 | Marks: 2.5 | In-Class Lab

A REST API built with **Node.js + Express.js** to manage student records
using full CRUD operations. No database is used — data is stored as a
**JavaScript array**, seeded from and persisted to a JSON file
(`data/students.json`), as required by the assignment restrictions.

---

## 📁 Project Structure

```
student-management-api/
├── app.js                  # Express server entry point
├── package.json
├── routes/
│   └── studentRoutes.js    # All /students CRUD routes (modular routing)
├── middleware/
│   ├── logger.js           # Custom logger middleware
│   └── errorHandler.js     # 404 + centralized error handler
└── data/
    ├── students.js         # Data-access helper functions (array + JSON file)
    └── students.json       # In-memory "database" (JSON file, no MongoDB/MySQL)
```

## 🛠 Technology Stack

- Node.js
- Express.js
- Postman (for testing)

## 🚀 Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start

# (optional) run with auto-restart during development
npm run dev
```

The server runs at: `http://localhost:3000`

## 📚 API Endpoints

| Method | Endpoint         | Description              | Success Status |
|--------|------------------|---------------------------|-----------------|
| GET    | `/students`      | Get all students          | 200 |
| GET    | `/students/:id`  | Get a single student      | 200 / 404 |
| POST   | `/students`      | Create a new student      | 201 / 400 |
| PUT    | `/students/:id`  | Update an existing student| 200 / 400 / 404 |
| DELETE | `/students/:id`  | Delete a student          | 200 / 404 |

### Request body example (POST / PUT)

```json
{
  "name": "Sneha Rao",
  "course": "BCA",
  "age": 20,
  "email": "sneha.rao@example.com"
}
```

### Response status codes used

- `200` Success
- `201` Created
- `400` Bad Request (missing/invalid fields, invalid id)
- `404` Not Found (student id doesn't exist, unknown route)
- `500` Internal Server Error (unexpected errors)

## 🧪 Testing with Postman

1. Open Postman and create a new Collection called **Student Management API**.
2. Add requests for each endpoint above, pointing to `http://localhost:3000/...`.
3. For POST and PUT, go to **Body → raw → JSON** and paste a student object.
4. Run each request and confirm the status code + JSON response match the table above.
5. Try invalid input (e.g. missing `name`) and an unknown id to confirm the
   error handling returns `400` / `404` correctly.

## ✅ Functional Requirements Checklist

- [x] Create Express Server
- [x] Create Student CRUD APIs
- [x] Implement Custom Logger Middleware
- [x] Use Modular Routing
- [x] Handle Errors Properly (custom 404 + centralized error handler)
- [x] Test APIs using Postman

---

Happy Coding! 🎯
