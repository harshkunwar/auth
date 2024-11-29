const express = require("express");
const bcrypt = require("bcryptjs");
const { User } = require("./models");
const jwt = require("jsonwebtoken");
const { generateToken } = require("./auth"); // Import the updated function
const mongoose = require("mongoose");
const { authenticateToken } = require("./middleware");
const { jwtToken } = require("./secrets");
mongoose.connect("mongodb://localhost:27017/jwtauth", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

const app = express();
app.use(express.json());
app.post("/signup", async (req, res) => {
  const { username, email, password, role } = req.body;
  console.log(req.body);

  try {
    // Check if the email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already in use" });
    }
    // Create a new user
    const newUser = new User({
      username,
      email,
      password,
      role: role || "user", // Default to 'user' if no role is provided
    });

    // Save the new user
    await newUser.save();

    console.log("me");
    // Create JWT token
    const payload = {
      userId: newUser._id,
      email: newUser.email,
      role: newUser.role,
    };

    // Sign the JWT token with a secret
    const token = jwt.sign(payload, jwtToken, {
      expiresIn: "1h",
    });

    // Send response with token
    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: "User not found" });

    // Validate password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid)
      return res.status(401).send({ message: "Invalid credentials" });

    // Generate JWT
    const token = generateToken(user);
    await createSession(user._id, token);
    res.send({ token });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).send({ message: "Internal server error" });
  }
});
app.get("/protected", authenticateToken, (req, res) => {
  res.send({
    message: "This is a protected route",
    user: req.user, // Contains userId, email, and role from the token
  });
});
app.post("/deep", (req, res) => {
  console.log("abhay ki biwwi");
  console.log(req.body);
});
// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
