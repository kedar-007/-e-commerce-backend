const mongoose = require("mongoose");

// Define the Product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Product name
  description: { type: String, required: true }, // Product description
  category: { type: String, required: true }, // Product category
  startDate: { type: Date, required: true }, // Start date of product availability
  expiryDate: { type: Date, required: true }, // Expiry date of product availability
  deliveryOption: {
    type: String,
    enum: ["Free Delivery", "Paid Delivery"], // Delivery options
    required: true,
  },
  deliveryAmount: { type: Number, default: 0 }, // Delivery cost, default is 0 for free delivery
  images: [{ type: String }], // Array of image URLs
  oldPrice: { type: Number, required: true }, // Previous price of the product
  newPrice: { type: Number, required: true }, // Discounted or current price
  productURL: { type: String, required: true, unique: true }, // Unique product URL
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" }, // Reference to the Vendor model
});

// Export the Product model
module.exports = mongoose.model("Product", productSchema);
