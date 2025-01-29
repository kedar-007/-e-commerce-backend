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

// Controller to handle adding a new product
exports.addProduct = async (req, res) => {
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
  if (
    !name ||
    !description ||
    !category ||
    !startDate ||
    !expiryDate ||
    !vendor
  ) {
    return sendErrorResponse(res, 400, "Required fields are missing.");
  }

  try {
    // Create a new product instance with provided data
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

    // Save the product to the database
    await product.save();

    // Respond with the created product details
    return res
      .status(201)
      .json({ success: true, message: "Product successfully added", product });
  } catch (error) {
    // Handle errors while adding the product
    return sendErrorResponse(res, 500, "Failed to add product", error);
  }
};

// Controller to handle fetching all products with pagination
exports.getAllProducts = async (req, res) => {
  try {
    // Pagination parameters with default values
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch products with pagination applied
    const products = await Product.find().skip(skip).limit(limit);

    // Get the total count of products
    const totalCount = await Product.countDocuments();

    // Respond with paginated product data
    res.status(200).json({
      success: true,
      products,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      perPage: limit,
    });
  } catch (error) {
    // Handle errors while fetching products
    return sendErrorResponse(res, 500, "Error retrieving products", error);
  }
};

// Controller to handle setting the vendor for a product
exports.setVendor = async (req, res) => {
  const { vendorId, productId } = req.body;

  // Validate that both vendorId and productId are provided
  if (!vendorId || !productId) {
    return sendErrorResponse(
      res,
      400,
      "Both vendorId and productId are required."
    );
  }

  try {
    // Find the product and update its vendor field
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { vendor: vendorId },
      { new: true, runValidators: true }
    );

    // If product is not found, send a 404 response
    if (!updatedProduct) {
      return sendErrorResponse(res, 404, "Product not found.");
    }

    // Respond with the updated product data
    res.status(200).json({
      success: true,
      message: "Vendor updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    // Handle errors while updating the vendor
    console.error("Error updating vendor:", error);
    return sendErrorResponse(res, 500, "Error updating vendor", error);
  }
};
