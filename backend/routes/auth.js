const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');  // Assuming you have a User model in models/User.js
const router = express.Router();

// Signup Route
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and Password are required" });
  }

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Return success message
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during signup. Please try again." });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    // Compare password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password." });
    }

    // Respond with user data (you can include a JWT token for authentication in the future)
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
