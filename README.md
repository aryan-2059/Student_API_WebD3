# Student Management REST API

Built with **Node.js** and **Express.js**. Manages student records through CRUD operations using an in-memory array.

## Features

- Full CRUD for student records
- Custom logger middleware (method, URL, status code, response time)
- Modular routing with `express.Router()`
- Input validation and centralized error handling
- Proper status codes: `200`, `201`, `400`, `404`

## Project Structure

```text
student-api/
├── app.js                   # Entry point: server setup, middleware, route mounting
├── package.json
├── routes/
│   └── studentRoutes.js     # CRUD routes
├── middleware/
│   ├── logger.js            # Custom request logger
│   └── errorHandler.js      # 404 + global error handler
└── data/
    └── students.js          # In-memory student array
```

## Getting Started

**Requirements:** Node.js installed v24.0

```bash
npm install
npm start
```

Server runs at `http://localhost:3000`.

## API Endpoints

| Method | Endpoint          | Description          | Success |
|--------|-------------------|----------------------|---------|
| GET    | `/students`       | Get all students     | 200     |
| GET    | `/students/:id`   | Get one student      | 200     |
| POST   | `/students`       | Create a student     | 201     |
| PUT    | `/students/:id`   | Replace a student    | 200     |
| DELETE | `/students/:id`   | Delete a student     | 200     |

### Student Object

```json
{
  "id": 1,
  "name": "Aryan Solanki",
  "age": 19,
  "course": "B.Tech CSE (AI/ML)"
}
```

`name` (non-empty string), `age` (positive integer) and `course` (non-empty string) are required for `POST` and `PUT`. `id` is auto-generated.

### Example

```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{"name":"Radhika Apte","age":20,"course":"BTech DS"}'
```

## Error Responses

All errors return JSON in the form `{ "error": "message" }`.

| Status | When                                                        |
|--------|-------------------------------------------------------------|
| 400    | Invalid/missing fields, non-numeric `id`, malformed JSON    |
| 404    | Student not found, or unknown route                         |
| 500    | Unexpected server error                                     |

## Notes

- Data lives in RAM and **resets on every server restart**.
- Logger is registered before `express.json()` so that requests failing on bad JSON are still logged.
