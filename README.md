# Shopping List API

## Overview

This project is a simple Node.js application that serves as both a basic File Manager and a REST API for managing a shopping list.
It uses Node.js' built-in HTTP module and file system capabilities to store shopping list data in JSON format and exposes CRUD
(Create, Read, Update, Delete) operations via HTTP endpoints. Each item in the shopping list has a unique identifier (ID) for
easy reference.

## Features

- **Create a shopping list item** by sending POST requests.
- **Read the details of a shopping list item** with GET requests.
- **Read the entire shopping list** with GET requests.
- **Update existing items** with PUT requests using item IDs.
- **Delete items** from the list using DELETE requests based on item IDs.
- Data is stored in an array in the `item.ts` file that is in `controller` directory that is within the `src` directory.

## Endpoints

### 1. `GET /items`

Fetches the entire shopping list from the `items.ts` file.

### 2. `GET /items/:id`

Fetches the details of the shopping list item from the `items.ts` file by its unique ID. Replace `:id` with the actual item ID.

### 3. `POST /items`

Adds a new item to the shopping list. The item should be in the following format:

```json
{
  "name": "Milk",
  "status": false,
  "quantity": "2 Litres"
}
```

### 4. `PUT /items`

Updates an existing item's quantity using the item ID. The item update should be in the following format:

```json
{
    "id": "unique_id"
    "name": "Milk",
    "status": true,
    "quantity": "2 Litres"
}
```

### 5. `DELETE /items/:id`

Deletes an item from the list by its unique ID. Replace `:id` with the actual item ID.

## Requirements

- Node.js installed on your machine.

## Setup and Installation

1. Clone the repository:
   ```bash
   https://github.com/kgauhelo-tech/node-shopping-list-api.git
   ```
2. Navigate to the project directory:
   ```bash
   cd shopping-list-api-nodejs
   git checkout implementation
   ```
3. Install the necessary dependencies (if any):
   ```bash
   npm install
   ```

## Running the Server

Start the server on port 4000 by running:

```bash
npm run dev
```

The server will be available at `http://localhost:4000`.

## Testing

Use Postman or a similar tool to test the API endpoints on a local device.

### Example for POST request:

- URL: `http://localhost:4000/items`
- Method: `POST`
- Body (raw JSON):
  ```json
  {
    "name": "Milk",
    "status": false,
    "quantity": "2 Litres"
  }
  ```

## License

This project is licensed under the MIT License.
