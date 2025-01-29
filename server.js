const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config(); // Load environment variables from .env file

// Import route handlers
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const staffRoutes = require("./routes/staff");
const vendorRoutes = require("./routes/vendor");
const userRoutes = require("./routes/user");

const app = express();

// Middleware setup
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS)

// Define API route handlers
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/user", userRoutes);

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URI) // Use MongoDB URI from environment variables
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const PORT = process.env.PORT||3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start the server
