# Riddles Server & Client

A simple full-stack project for managing riddles using **Express.js** as the server framework and **MongoDB** as the database. The server handles CRUD operations on riddles and provides a RESTful API. Data is stored persistently in a MongoDB collection.

The project also includes a minimal **HTML/JS client** for interacting with the riddles database. Additionally, the server uses **chalk** for colored console logging and **readline-sync** for interactive terminal input.

---

## Features

- **RESTful API** for riddles (Create, Read, Update, Delete)
- **Express.js server**
- **MongoDB storage** using a riddles collection
- **Chalk** for colored terminal logs
- **Readline-sync** for interactive questions in CLI


---

## API Endpoints

- `GET /riddles`  
    Returns all riddles.

- `GET /riddles/:id`  
    Returns a specific riddle by ID.

- `POST /api/riddles/addRiddle`  
    Adds a new riddle. Expects JSON body:  
    `{ "question": "...", "answer": "..." }`

- `PUT /riddles/:id`  
    Updates a riddle by ID. Expects JSON body.

- `DELETE /riddles/:id`  
    Deletes a riddle by ID.

---

## Running the Server

1. Make sure **Node.js** and **MongoDB** are installed and running.
2. In the project directory, install dependencies:
   ```bash
   npm install
