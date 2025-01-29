const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// User Routes

// Retrieve all available products
router.get("/products", userController.getProducts);

// Search for products based on query parameters
router.get("/search", userController.searchProducts);

module.exports = router; // Export the router for use in the main application
