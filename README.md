
# Web Connect Social Media Application

## Overview

This project is a social media application with user authentication, post creation, liking, and following features. It includes a Node.js and Express backend with MySQL for data storage, and a React.js frontend with JWT-based authentication.

## Backend (Node.js & Express)

### Setup

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd backend

    Install Dependencies:

    bash

npm install

Create a .env File:

Create a .env file in the root directory and configure the following environment variables:

plaintext

DB_HOST=<your-database-host>
DB_USER=<your-database-user>
DB_PASSWORD=<your-database-password>
DB_NAME=<your-database-name>
JWT_SECRET=<your-jwt-secret>
PORT=5000

Database Setup:

    Create the required tables in MySQL. Here are some example SQL commands to set up the tables:

    sql

    CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );

    CREATE TABLE posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE likes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      post_id INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (post_id) REFERENCES posts(id)
    );

    CREATE TABLE follows (
      id INT AUTO_INCREMENT PRIMARY KEY,
      follower_id INT NOT NULL,
      followed_id INT NOT NULL,
      FOREIGN KEY (follower_id) REFERENCES users(id),
      FOREIGN KEY (followed_id) REFERENCES users(id)
    );

Run the Server:

bash

    npm start

Endpoints

    User Registration: POST /api/register
    User Login: POST /api/login
    Create Post: POST /api/posts
    Retrieve All Posts: GET /api/posts
    Like a Post: POST /api/posts/:id/like
    Follow a User: POST /api/users/:id/follow

Authentication Middleware

    Protect routes with JWT authentication. Add authMiddleware to the routes that require authentication.

JWT Configuration

    Use jsonwebtoken to create and verify JWT tokens.


    Frontend (React.js)
Setup

    Navigate to the Frontend Directory:

    bash

cd frontend

Install Dependencies:

bash

npm install

Create a .env File:

Create a .env file in the root directory and configure the following environment variables:

plaintext

REACT_APP_API_URL=http://localhost:5000/api

Run the Development Server:

bash

    npm start

Components

    User Registration and Login: Forms to register and log in users.
    Create Post: Form to create new posts.
    Feed: Displays a list of posts with options to like and follow users.

Routing

    Use React Router for navigation between pages.

Authentication

    Implement JWT authentication to secure routes and store the token in local storage.

Pagination

    Implement pagination for the post feed to manage large sets of posts.

Additional Requirements

    Error Handling and Validation:
        Validate user input on both the frontend and backend.
        Handle errors gracefully and provide meaningful feedback.

    Styling:
        Apply basic styling to enhance the user experience.

Contributing

Feel free to fork the repository and submit pull requests with improvements or bug fixes.
