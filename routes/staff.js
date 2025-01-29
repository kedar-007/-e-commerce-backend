const express = require("express");
const staffController = require("../controllers/staffController");
const auth = require("../middleware/auth"); // Middleware to authenticate requests

const router = express.Router();

// Staff Routes

// Add a new product (Protected route)
router.post("/products", auth, staffController.addProduct);

// Retrieve all products (Protected route)
router.get("/products", auth, staffController.getAllProducts);

// Assign a vendor to a product (Protected route)
router.post("/setVendor", auth, staffController.setVendor);

module.exports = router; // Export the router for use in the main application
