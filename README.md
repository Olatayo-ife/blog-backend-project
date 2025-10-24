# Blog Platform Backend (Node.js + Express + MySQL)

This is a **full backend API** for a Blog Platform built with **Node.js**, **Express**, and **MySQL**.  
It supports **user authentication**, **blog posts**, **comments**, and an integrated **Gmail newsletter service** for sending updates and managing subscriptions.

---

## Features

- User Registration & Login (JWT authentication)
- Create, Edit, Delete Blog Posts
- Comment on Posts
- Like & Unlike Posts
- Gmail Newsletter Service (subscribe and send emails)
- MySQL Database Integration with Sequelize ORM
- Secure password hashing with bcrypt
- RESTful API architecture

---

## Tech Stack

| Layer        | Technology Used |
|---------------|----------------|
| Backend       | Node.js + Express.js |
| Database      | MySQL + Sequelize ORM |
| Authentication| JWT (JSON Web Token) |
| Email Service | Nodemailer + Gmail SMTP |
| Environment   | dotenv |

---

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Olatayo-ife/blog-backend-project.git
   cd blog-platform-backend

2. **Install dependencies**

     npm install

3. **Create a .env file in the root folder:**
    
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=blog_platform
    DB_DIALECT=mysql
    EMAIL_USER=youremail@gmail.com
    EMAIL_PASS=your_app_password
    JWT_SECRET=your_jwt_secret
    PORT=5000

4. **Start MySQL and ensure the database exists:**

CREATE DATABASE blog_platform;


5. **Run the server**

npm run dev


You should see:

Database connected.
Server running on port 5000

**API Endpoints**
User Routes
Method	Endpoint	Description	Body
POST	/api/auth/register	Register a new user	{ "username": "john", "email": "john@mail.com", "password": "123456" }
POST	/api/auth/login	Login and get JWT token	{ "email": "john@mail.com", "password": "123456" }

**Blog Post Routes**
Method	Endpoint	Description	Auth Required
POST	/api/posts	Create a post	✅
GET	/api/posts	Get all posts	❌
GET	/api/posts/:id	Get single post	❌
PUT	/api/posts/:id	Update a post	✅
DELETE	/api/posts/:id	Delete a post	✅

Example Body:

{
  "title": "My First Post",
  "content": "This is my first blog post!"
}

Comment Routes
Method	Endpoint	Description
POST	/api/comments/:postId	Add comment to a post
GET	/api/comments/:postId	Get all comments for a post

Example Body:

{
  "content": "Nice article!"
}

 **Like Routes**
Method	Endpoint	Description
POST	/api/posts/:id/like	Like or Unlike a post

**Newsletter Routes**
Method	Endpoint	Description	Body
POST	/api/newsletter/subscribe	Subscribe to the newsletter	{ "email": "user@gmail.com" }
POST	/api/newsletter/send	Send newsletter email to all subscribers	{ "subject": "New Post!", "message": "Check out our latest post..." }
🔐 Authentication

All protected routes require a JWT token in the header:

Authorization: Bearer <your_token>

**Testing with Postman**

Import the base URL:

http://localhost:5000


Test each endpoint:

Use Content-Type: application/json header.

Use POST method for routes that accept JSON bodies.

Example for subscribing to the newsletter:

{
  "email": "subscriber@gmail.com"
}

**Project Structure**
blog-platform-backend/
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── authController.js
│   ├── postController.js
│   ├── commentController.js
│   └── newsletterController.js
│
├── models/
│   ├── User.js
│   ├── Post.js
│   ├── Comment.js
│   └── Newsletter.js
│
├── routes/
│   ├── auth.js
│   ├── posts.js
│   ├── comments.js
│   └── newsletter.js
│
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md

**Deployment**

To deploy:

Set environment variables on your hosting platform.

Ensure MySQL is accessible (e.g. Railway, Render, or PlanetScale).

Run:

npm start

**Author**

Hezekiah Olatayo
Backend Developer | Node.js | MySQL | Express.js

Email me: olatayohezekiah@gmail.com

**Contributing**

Contributions are welcome!

Fork the repo

Create a new branch

Make your changes

Submit a pull request 
