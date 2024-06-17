# Task-Management-System

Welcome to the Task Management System project. Our application simplifies task management, empowering users to efficiently organize their daily tasks with ease. By providing functionalities for task creation, retrieval, updating, and deletion, users can seamlessly manage their tasks after registering and logging in, ensuring a personalized and secure experience based on their authentication credentials.


## Technology Stack

- Node.js: A powerful JavaScript runtime environment for building server-side applications.
- Express.js: A minimalist web framework for Node.js that simplifies building APIs and web applications.
- MongoDB: A flexible NoSQL database system for storing and managing task data.


## Objective

The objective of this project is to develop a RESTful API that allows users to perform CRUD operations (Create, Read, Update, Delete) on tasks for a task management system.

## Requirements

### Task Model

Defined a MongoDB schema for tasks with fields such as title, description, due date, priority, status, etc.

## API Endpoints

### Users

**POST /user/register**

- Description: Register a new user.

- Request Body:

```bash
{
 "username": "string",
 "email": "string",
 "password": "string"
}
```


**POST /user/login**

- **Description:** Login with user credentials.

- **Request Body:**

```bash
{
  "email": "string",
  "password": "string"
}
```


### Tasks

**POST /tasks**

- **Description:** Create a new task.

- **Request Headers:**

- Authorization: Bearer

- **Request Body:**

```bash
{
  "title": "string",
  "description": "string",
  "priority": "string",
  "status":"string",
}
```


**GET /tasks**

- **Description:** Get all tasks for the authenticated user.

- **Request Headers:**

 Authorization: Bearer

**Responses:**

200 OK

```bash
[
  {
    "_id": "string",
    "title": "string",
    "description": "string",
    "priority": "string",
    "status": "string",
    "userId": "string",
    "createdAt": "date"
  },
  
]
```

 400 Bad Request

```bash
{
  "msg": "Error message"
}
```

### GET /task/:id

- **Description:** Get a particular task by ID for the authenticated user.

- **Request Headers:**

Authorization: Bearer


- **Request Parameters:**

id: Task ID


- **Responses:**

200 OK

```bash
{
  "_id": "string",
  "title": "string",
  "description": "string",
  "priority": "string",
  "status": "string",
  "userId": "string",
}

```

400 Bad Request

```bash
{
  "msg": "Error message"
}
```


### PATCH /task/:id

- **Description:** Update a particular task by ID for the authenticated user.

**Request Headers:**

Authorization: Bearer

- **Request Parameters:**

id: Task ID


- **Request Body:**

```bash 

{
  "title": "string",
  "description": "string",
  "priority": "string",
  "status": "string"
}

```
**Responses:**

200 OK

```bash

{
    "msg": "Tasks has been updated"
}

```

400 Bad Request

```bash
{
  "msg": "Error message"
}

```
### DELETE /tasks/:id
- **Description:** Delete a particular task by ID for the authenticated user.

**Request Headers:**

Authorization: Bearer

- **Request Parameters:**

id: Task ID

- **Responses:**

200 OK

```bash

{
  "msg": "Task has been deleted"
}

```
400 Bad Request

```bash
{
  "msg": "Error message"
}

```
## Technical Considerations

- Used Node.js with Express.js for building the RESTful API.
- Used MongoDB as the database for storing tasks.
- Implemented JWT-based authentication for securing the API endpoints.


## Getting Started

### To get started with the Task Management System API, follow these steps:

1. **Clone this repository:**

   ```bash
   `git clone https://github.com/Sonali020200/Fluid-AI_Backend.git`
    
    `cd task-management-system`

   ```
2. **Install the dependencies:**
   ```bash
    `npm install`
   ```
  
3. **Create a .env file in the root directory and add the following environment variables:**  

    PORT=8080
    mongoURL= <your_mongoDB_connection_string>
    Key= <your_jwt_secret_key>

4. **Start the server:**

    `npm run server`

## Deployed link

https://fluid-ai-backend.onrender.com


