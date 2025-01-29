const mongoose = require("mongoose");

// Define the Vendor schema
const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Vendor's business name
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the associated User
});

// Export the Vendor model
module.exports = mongoose.model("Vendor", vendorSchema);
