[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/5DxnKIye)

# CookCookCook Project

## Overview

CookCookCook is a API to manage and share recipes. It provides functionalities to add, view, and manage ingredients and
recipes through a RESTful API.

## Features

-   **Ingredient Management**: Add, update, and delete ingredients.
-   **Recipe Management**: Create, update, and delete recipes.
-   **Database Integration**: Uses MongoDB for data storage.

## Technologies Used

-   **Deno**: A modern runtime for JavaScript and TypeScript.
-   **Oak**: A middleware framework for Deno's HTTP server, inspired by Koa.
-   **MongoDB**: A NoSQL database for storing application data.
-   **Zod**: A TypeScript-first schema declaration and validation library.

## Project Structure

-   `server.ts`: Main server file that sets up the application and routes.
-   `deps.ts`: Manages external dependencies.
-   `controllers/`: Contains the controllers for handling HTTP requests.
-   `repositories/`: Manages database connections and operations.
-   `services/`: Contains business logic for the application.
-   `utils/`: Utility functions and custom exceptions.

## Setup and Installation

1. **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Install Deno**: Follow the instructions on [deno.land](https://deno.land/#installation).

3. **Set up environment variables**: Copy `.env.exemple` to `.env` and fill in the necessary details.

4. **Run the application**:

    ```bash
    deno run --allow-net --allow-read --allow-env server.ts
    ```

5. **Access the application**: Open your browser and go to `http://localhost:8000`.

## API Endpoints

-   **Ingredients**:

    -   `GET /ingredients`: List all ingredients.
    -   `POST /ingredients`: Add a new ingredient.
    -   `PUT /ingredients/:id`: Update an ingredient.
    -   `DELETE /ingredients/:id`: Delete an ingredient.

-   **Recipes**:
    -   `GET /recipes`: List all recipes.
    -   `POST /recipes`: Add a new recipe.
    -   `PUT /recipes/:id`: Update a recipe.
    -   `DELETE /recipes/:id`: Delete a recipe.

## License

This project is licensed under the MIT License.

## Additional Resources

### Postman Collection

A Postman collection (`postman_collection.json`) is included in the repository to help test the API endpoints. You can
import this collection into Postman to quickly start making requests to your local server.

### Sample Database

A sample MongoDB database structure (`data-mongodb.json`) is provided to help you understand the data schema and get
started with some initial data. You can import this file into your MongoDB instance using:
