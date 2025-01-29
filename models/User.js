const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // Unique username
  password: { type: String, required: true }, // Hashed password
  role: {
    type: String,
    enum: ["admin", "staff", "vendor", "user"], // User roles
    required: true,
  },
});

// Hash the password before saving the user to the database
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8); // Hash password with bcrypt
  }
  next();
});

// Export the User model
module.exports = mongoose.model("User", userSchema);
