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

// Helper function to handle product retrieval with pagination
const getPaginatedProducts = async (query, page, limit) => {
  const skip = (page - 1) * limit;
  const products = await Product.find(query)
    .skip(skip)
    .limit(limit)
    .populate("vendor");

  const totalCount = await Product.countDocuments(query);

  return {
    products,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    currentPage: page,
    perPage: limit,
  };
};

// Controller to handle retrieving products with pagination
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { products, totalCount, totalPages, currentPage, perPage } = await getPaginatedProducts({}, page, limit);

    res.status(200).json({
      success: true,
      products,
      totalCount,
      totalPages,
      currentPage,
      perPage,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Error retrieving products", error);
  }
};

// Controller to handle searching products with pagination
exports.searchProducts = async (req, res) => {
  const { query } = req.body;

  // Validate query input
  if (!query || query.trim().length === 0) {
    return sendErrorResponse(res, 400, "Search query is required.");
  }

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Search products by name using regex for case-insensitive search
    const { products, totalCount, totalPages, currentPage, perPage } = await getPaginatedProducts(
      { name: { $regex: query, $options: "i" } },
      page,
      limit
    );

    res.status(200).json({
      success: true,
      products,
      totalCount,
      totalPages,
      currentPage,
      perPage,
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Error searching products", error);
  }
};
