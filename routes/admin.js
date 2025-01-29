const express = require("express");
const adminController = require("../controllers/adminController");
const auth = require("../middleware/auth"); // Authentication middleware to protect routes

const router = express.Router();

// Admin Routes

// Create a new product (Protected route)
router.post("/product", auth, adminController.createProduct);

// Get a list of all vendors (Protected route)
router.get("/vendors", auth, adminController.getAllVendors);

// Get a list of all users (Protected route)
router.get("/users", auth, adminController.getAllUsers);

// Get a list of all products (Protected route)
router.get("/products", auth, adminController.getAllProducts);

// Get a list of all staff members (Protected route)
router.get("/staffs", auth, adminController.getAllStaffs);

module.exports = router; // Export the router for use in the main application
