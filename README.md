# **COMP3123 - Full Stack Development 1 - Assignment 1**

## **Project Overview**
  This project is a Backend application that implements a set of RESTful API endpoints using Node.js, Express, and MongoDB. The goal is to practice building and deploying a server-side API that supports basic CRUD operations for user and employee management.

### **Objectives:**
  Understand RESTful API design principles.
  Implement CRUD operations with the provided API endpoints.
  Ensure API returns the correct status codes and response formats.
  Apply version control practices using GitHub for project management.

Technologies:
  Node.js
  Express.js
  MongoDB (MongoDB Atlas)
  Mongoose (for MongoDB ORM)
  bcrypt (for password hashing)
  Postman (for testing APIs)
  API Endpoints
  
User Management:
  POST /api/v1/user/signup - Create a new user account.
  POST /api/v1/user/login - Log in an existing user.

Employee Management:
  GET /api/v1/emp/employees - Retrieve all employees.
  POST /api/v1/emp/# **COMP3123 - Full Stack Development 1 - Assignment 1**

## **Project Overview**
This project is a Backend application that implements a set of RESTful API endpoints using **Node.js**, **Express**, and **MongoDB**. The goal is to practice building and deploying a server-side API that supports basic CRUD operations for user and employee management.

## **Objectives:**
- Understand RESTful API design principles.
- Implement CRUD operations with the provided API endpoints.
- Ensure API returns the correct status codes and response formats.
- Apply version control practices using GitHub for project management.

## **Technologies:**
- **Node.js**
- **Express.js**
- **MongoDB** (MongoDB Atlas)
- **Mongoose** (for MongoDB ORM)
- **bcrypt** (for password hashing)
- **Postman** (for testing APIs)

## **API Endpoints**

### **User Management:**
- `POST /api/v1/user/signup` - Create a new user account.
- `POST /api/v1/user/login` - Log in an existing user.

### **Employee Management:**
- `GET /api/v1/emp/employees` - Retrieve all employees.
- `POST /api/v1/emp/employees` - Create a new employee.
- `GET /api/v1/emp/employees/{eid}` - Retrieve a single employee by ID.
- `PUT /api/v1/emp/employees/{eid}` - Update an employee's information.
- `DELETE /api/v1/emp/employees?eid=xxx` - Delete an employee by ID.

## **MongoDB Collections:**
- **Users Collection**: Contains user details such as `username`, `email`, and `hashed password`.
- **Employee Collection**: Contains employee details like `first_name`, `last_name`, `email`, `position`, and more.

## **Project Structure:**

- |-- models/
- |   |-- user.model.js
- |   |-- employee.model.js
- |-- routes/
- |   |-- user.routes.js
- |   |-- employee.routes.js
- |-- controllers/
- |   |-- user.controller.js
- |   |-- employee.controller.js
- |-- index.js
- |-- vercel.json (for deployment)


## **Installation and Setup:**

1. **Clone the repository:**
    ```bash
    git clone https://github.com/YourUsername/StudentID_COMP3123_Assignment1.git
    cd StudentID_COMP3123_Assignment1
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Create a `.env` file with the following content:**
    ```
    MONGO_URI=your_mongoDB_connection_string
    ACCESS_TOKEN_SECRET=your_jwt_secret
    ```

4. **Run the application:**
    ```bash
    npm start
    ```

## **Testing:**
- Use the Postman collection provided in the repository to test the API.
- Sample API responses and error messages have been implemented for user authentication and employee management.

## **Deployment**
This application can be deployed using **Vercel**, **Heroku**, or any preferred cloud platform. Configuration is provided in the `vercel.json` file for deployment on **Vercel**.
