# 🚀 Faxian IT – Job Posts CRUD Backend (Node.js + Express + MySQL)

This project is a lightweight and efficient backend service built using **Node.js**, **Express.js**, and **MySQL** to manage job postings for the Faxian IT Job Portal. It provides a clean structure with essential CRUD operations—Create, Read, Update, and Delete—allowing seamless management of job listings.

The backend is designed for simplicity, clarity, and easy integration with any frontend application.

---

## 📘 Extended Project Description

This repository contains two main files:

### **1. server.js**
`server.js` is the core file responsible for:
- Initializing the Express application   
- Establishing a connection with the MySQL database  
- Importing and registering the job routes  
- Starting the server on the specified port  

It ensures a stable environment where incoming API requests are processed and responses are delivered correctly.

---

### **2. jobRoutes.js**
`jobRoutes.js` manages all the route definitions related to job posts. It:
- Defines REST API endpoints for CRUD operations  
- Connects each endpoint to corresponding SQL queries in the server  
- Handles request parameters and passes data appropriately  
- Keeps routing clean and separate from core server logic  

This file helps maintain modularity, making the backend easy to scale and understand.

---

## 📡 CRUD API Endpoints

```
POST    /add-job           → Add a new job post  
GET     /get-jobs          → Retrieve all job posts  
GET     /get-job/:id       → Get a job post by ID  
PUT     /update-job/:id    → Update job details  
DELETE  /delete-job/:id    → Delete a job by ID  
```

---

## 🛠 Technologies Used
- **Node.js**
- **Express.js**
- **MySQL**
- **Nodemon** (optional for dev)

---

## 🚀 How to Run the Project

1. Install dependencies  
```
npm install
```

2. Start the backend  
```
node server.js
```

3. Ensure MySQL is running and the database/table structure matches your SQL queries.

---

## 👩‍💻 Author  
**Palnati Vaishnavi**  
Full Stack Developer | Node.js | MySQL  
GitHub: @palnativaishnavi

---

