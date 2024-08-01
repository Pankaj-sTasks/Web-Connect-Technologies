
# Web Connect Social Media Application

## Overview

This project is a social media application with user authentication, post creation, liking, and following features. It includes a Node.js and Express backend with MySQL for data storage, and a React.js frontend with JWT-based authentication.

## Backend (Node.js & Express)

### Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Pankaj-sTasks/Web-Connect-Technologies.git
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




# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
