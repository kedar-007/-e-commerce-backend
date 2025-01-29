const Product = require("../models/Product");
const Vendor = require("../models/Vendor");
const User = require("../models/User");

// Utility function to handle errors consistently
const sendErrorResponse = (res, statusCode, message, error = null) => {
  console.error(`Error: ${message}`, error ? error : "");
  return res
    .status(statusCode)
    .json({ success: false, message, error: error ? error.message : null });
};

// Create a new product
exports.createProduct = async (req, res) => {
  const {
    name,
    description,
    category,
    startDate,
    expiryDate,
    deliveryOption,
    deliveryAmount,
    images,
    oldPrice,
    newPrice,
    productURL,
    vendor,
  } = req.body;

  // Validate required fields
  if (!name || !description || !category || !startDate || !expiryDate || !vendor) {
    return sendErrorResponse(res, 400, "Required fields are missing.");
  }

  try {
    const product = new Product({
      name,
      description,
      category,
      startDate,
      expiryDate,
      deliveryOption,
      deliveryAmount,
      images,
      oldPrice,
      newPrice,
      productURL,
      vendor,
    });

    await product.save();
    return res.status(201).json({
      success: true,
      message: "Product successfully added",
      product,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Failed to add product", error);
  }
};

// Retrieve all vendors
exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("user"); // Populate user details
    return res.status(200).json({ success: true, vendors });
  } catch (error) {
    return sendErrorResponse(res, 500, "Failed to retrieve vendors", error);
  }
};

// Retrieve all users with role "user"
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    return res.status(200).json({ success: true, users });
  } catch (error) {
    return sendErrorResponse(res, 500, "Failed to retrieve users", error);
  }
};

// Retrieve all staff members
exports.getAllStaffs = async (req, res) => {
  try {
    const staff = await User.find({ role: "staff" });
    return res.status(200).json({ success: true, staff });
  } catch (error) {
    return sendErrorResponse(res, 500, "Failed to retrieve staff members", error);
  }
};

// Retrieve all products with pagination
exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch products with pagination and vendor details
    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .populate("vendor");

    const totalCount = await Product.countDocuments();

    return res.status(200).json({
      success: true,
      products,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      perPage: limit,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Failed to retrieve products", error);
  }
};
