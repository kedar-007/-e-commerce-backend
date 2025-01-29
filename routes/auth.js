const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Authentication Routes

// User signup - Registers a new user
router.post("/signup", authController.signup);

// User login - Authenticates a user and returns a token
router.post("/login", authController.login);

module.exports = router; // Export the router for use in the main application
