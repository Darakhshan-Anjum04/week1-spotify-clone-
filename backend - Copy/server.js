const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config();  // Import dotenv to access environment variables

const app = express();  // Initialize app first
const port = process.env.PORT || 3000;  // Use environment port or default to 3000

// CORS setup 
app.use(cors({
    origin: 'http://localhost:5173',  // Replace with your frontend URL
    methods: ['GET', 'POST'],
    credentials: true,  // Allow cookies if needed
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB (Database name is Users and collection name is Information)
mongoose.connect("mongodb://localhost:27017/Users", ).then(() => {
  console.log("MongoDB Connected");
}).catch((err) => {
  console.log("MongoDB Connection Error:", err);
});

// User Schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("User", userSchema);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the music player API!");
});

// POST API to register user
app.post("/api/SignUpForm", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists!" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  // Generate JWT token
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });

  // Send token in HttpOnly cookie
  res.cookie("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",  // Only set to true in production
    sameSite: "Strict",
    maxAge: 3600000, // 1 hour
  }).status(201).send({ message: "User registered successfully" });
});

// POST API to login user
app.post("/api/Login", async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found!" });
  }

  // Compare password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "Invalid credentials!" });
  }

  // Generate JWT token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' });

  // Send token in HttpOnly cookie
  res.cookie("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",  // Only set to true in production
    sameSite: "Strict",
    maxAge: 3600000, // 1 hour
  }).status(200).send({ message: "Logged in successfully" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
