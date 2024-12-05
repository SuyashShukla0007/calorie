const jwt = require('jsonwebtoken');
const User = require('../model/users');
const express = require('express');

const app = express();

// Create new user
async function postUser(req, res) {
  try {
    console.log(req.body); // Log req.body to inspect its content

    const { firstname, lastname, email, age, phone, password, confirmPassword, height, weight } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Create a new user instance
    const newUser = new User({
      firstname,
      lastname,
      email,
      height,
      weight,
      phone,
      password,
      confirmPassword
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ email, firstname, lastname }, process.env.JWT_SECRET, { expiresIn: '3d' });

    // Respond with a success message and include token in the Authorization header
    res.setHeader('Authorization', `Bearer ${token}`);
    res.status(200).json({ message: 'User registered successfully', token });

  } catch (err) {
    // Handle validation errors or other errors during registration
    console.error('Error registering user:', err);
    res.status(400).json({ error: err.message }); // Return specific error message
  }
}

// Logout function
const logout = (req, res) => {
  try {
   
    res.status(200).send('Logout successful. Please clear your token from storage.');
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).send('An error occurred during logout');
  }
};

// Login function
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if password is correct (assuming passwords are stored as plain text)
    // You should use a hashed password comparison in a real application
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    console.log(process.env.JWT_SECRET)

    // Generate JWT token
    const token = jwt.sign({ email: user.email, firstname: user.firstname, lastname: user.lastname }, process.env.JWT_SECRET, { expiresIn: '3d' });

    // Respond with success message and token
    res.setHeader('Authorization', `Bearer ${token}`);
    res.status(200).json({ message: 'Login successful', token });

  } catch (err) {
    console.error('Error during login:', err);
    res.status(400).json({ error: err.message });
  }
};

// Get user details
async function getUser(req, res) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Extract token from header
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user based on decoded token
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.status(404).json({ error: 'No user found with this email' });
    }

    // Respond with user data
    res.status(200).json({ user });

  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(400).json({ error: error.message });
  }
}

module.exports = { postUser, getUser, login, logout };
