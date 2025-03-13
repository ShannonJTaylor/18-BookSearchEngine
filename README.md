# Book Search Engine App - README

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Screenshot](#screenshots)
- [Installation Instructions](#installation-instructions)
- [API Documentation](#api-documentation)
  - [GraphQL Queries](#graphql-queries)
  - [GraphQL Mutations](#graphql-mutations)
- [User Authentication](#user-authentication)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

___

## Project Overview
This Book Search Engine App is a full-stack web application built with the MERN stack (MongoDB, Express, React, Node.js) and GraphQL. It allows users to search for books through the Google Books API, save them to their profile, and manage their book collection. The app uses authentication to ensure that users can securely log in and save their data.

___

### Key Features:
- User authentication via JWT (JSON Web Tokens)
- Search for books using the Google Books API
- Save books to the user's profile for easy access
- GraphQL backend with Apollo Server
- User interface built with React and styled with Bootstrap

___

## Features
- **Login & Signup:** Users can register and log in to the app securely using email and password.
- **Book Search:** Users can search for books from the Google Books API and view results.
- **Save Books:** Users can save their favorite books to their personal collection.
- **GraphQL API:** All requests to the server use GraphQL queries and mutations for efficient data handling.

___

## Technologies Used
- **Frontend:** React, Bootstrap, Apollo Client
- **Backend:** Node.js, Express.js, Apollo Server
- **Database:** MongoDB, MongoDB Atlas
- **Authentication:** JWT (JSON Web Tokens)
- **API:** Google Books API, custom GraphQL API

___

## Screenshots
Take a look at the app!
![Sign Up!]()



## Installation Instructions
To get started with this project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/ShannonJTaylor/book-tracker.git
    cd book-tracker
    ```
2. Install dependencies:
    - Install frontend dependencies:
      ```bash
      cd client
      npm install
      ```
    - Install backend dependencies:
      ```bash
      cd ../server
      npm install
      ```
3. Set up environment variables:
    - Create a `.env` file in both the client and server directories. Add the necessary variables, such as:

      **For the server:**
      ```ini
      MONGODB_URI=<your-mongodb-uri>
      PORT=5000
      JWT_SECRET=<your-jwt-secret>
      ```
      **For the client:**
      ```ini
      REACT_APP_API_URL=<your-graphql-server-url>
      ```

4. Run the application:
    - Run the backend server:
      ```bash
      cd server
      npm start
      ```
    - Run the frontend React app:
      ```bash
      cd client
      npm start
      ```

The app should now be running on http://localhost:3000.

___

## API Documentation

### GraphQL Queries
- `searchBooks(query: String!):` Searches for books based on the provided query string.

  **Example Query:**
  ```graphql
  query {
    searchBooks(query: "Harry Potter") {
      title
      authors
      description
    }
  }

### GraphQL Mutations
-`loginUser(email: String!, password: String!):` Logs in a user and returns a JWT token.

 **Example Mutation**
 ```graphql
 mutation {
    loginUser(email: "user@example.com", password: "password123") {
    token
  }
 }
 ```
 -`signupUser (username: String!, email: String!, password: String!):` Registers a new user and returns a JWT token.

 **Example Mutation**
 ```graphql
 mutation {
    signupUser(username: "newuser", email: "newuser@example.com", password: "password123") {
    token
  }
 }
 ```
 -`saveBook(bookData: BookInput!):` Saves a book to the user's collection.

 **Example Mutation**
 ```graphql
 mutation {
    saveBook(bookData: { title: "The Great Gatsby", authors: ["F. Scott Fitzgerald"], description: "A novel about the American Dream." }) {
    title
    authors
  }
 }
 ```

 ___

## User Authentication
Authentication is handled through JWT (JSON Web Tokens). When a user logs in or signs up, a JWT is returned. This token should be stored securely (usually in localStorage or cookies) and included in the Authorization header for any authenticated requests.

The app includes the following components for authentication:

LoginForm: Allows users to log in by providing their email and password.

SignupForm: Allows users to create a new account.

Auth Helper: A utility to manage the JWT in localStorage and check user authentication status.

___

## Deployment
The app is deployed to Render and uses MongoDB Atlas for database management.

To deploy the app yourself, follow these steps:

1. Set up your MongoDB Atlas cluster and obtain your connection URI.

2. Configure the backend API and frontend with your MongoDB URI and the necessary environment variables.

3. Deploy both the frontend and backend to Render (or any other platform of your choice).

___

## Contributing
We welcome contributions! Here’s how you can contribute to this project:

1. Fork the repository.

2. Clone your forked repository locally.

3. Create a new branch for your changes.

4. Make your changes and add tests if applicable.

5. Commit your changes and push them to your fork.

6. Create a pull request.

Please make sure to follow the code style used in the project and write clear commit messages.

___

## License
[MIT License](https://mit-license.org/?form=MG0AV3)

___

Made with ❤️ by [ShannonJTaylor](https://github.com/ShannonJTaylor/18-BookSearchEngine)
