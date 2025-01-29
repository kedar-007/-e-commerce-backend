const express = require("express");
const vendorController = require("../controllers/vendorController");
const auth = require("../middleware/auth"); // Middleware to authenticate requests

const router = express.Router();

// Vendor Routes

// Add a new product (Protected route - Vendor only)
router.post("/product", auth, vendorController.addProduct);

// Retrieve all products associated with the vendor (Protected route)
router.get("/products", auth, vendorController.getProducts);

module.exports = router; // Export the router for use in the main application
