const Product = require("../models/Product");

// Utility function to handle error responses
const sendErrorResponse = (res, statusCode, message, error = null) => {
  console.error(`Error: ${message}`, error ? error : ""); // Log the error for debugging purposes
  return res.status(statusCode).json({
    success: false,
    message,
    error: error ? error.message : null, // Include the error message if it exists
  });
};

exports.addProduct = async (req, res) => {
  try {
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

    // Validate the required fields
    if (!name || !description || !category || !vendor) {
      return sendErrorResponse(
        res,
        400,
        "Missing required fields: name, description, category, vendor."
      );
    }

    // Create and save the product
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

    // Respond with the created product
    res.status(201).json({
      success: true,
      message: "Product successfully added",
      product,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Failed to add product", error);
  }
};

exports.getProducts = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return sendErrorResponse(
        res,
        401,
        "Unauthorized: Missing user authentication"
      );
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Use aggregation for combining query and total count in one call
    const [products, totalCount] = await Promise.all([
      Product.find({ vendor: req.user._id }).skip(skip).limit(limit),
      Product.countDocuments({ vendor: req.user._id }),
    ]);

    if (products.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No products found for this vendor",
        products: [],
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        perPage: limit,
      });
    }

    res.status(200).json({
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
