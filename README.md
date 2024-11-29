JWT Authentication with Express and MongoDB
This is a simple Node.js application that demonstrates JWT-based authentication using Express, MongoDB (via Mongoose), and bcryptjs for secure password hashing. The application includes features for user sign-up,login and JWT generation.

Features-
User Registration (Sign-up and Log-in):
Users can register with an email, password, and optional role (user or admin).
Passwords are hashed using bcryptjs before storing them in the database.
JWT Token Generation:
Upon successful registration, a JWT token is generated, containing the user's ID, email, and role.
The token is signed with a secret key and expires after 1 hour by default.

Prerequisites
Make sure you have the following installed:
Node.js (v14+ recommended)
npm (comes with Node.js)
MongoDB (You can use MongoDB Atlas or a local MongoDB server)



