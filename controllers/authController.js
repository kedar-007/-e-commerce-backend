const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Vendor = require("../models/Vendor");

// Utility function to handle error responses
const sendErrorResponse = (res, statusCode, message, error = null) => {
  console.error(`Error: ${message}`, error ? error : ""); // Log the error for debugging
  return res
    .status(statusCode)
    .json({
      success: false,
      message,
      error: error ? error.message : null, // Send the error message if exists
    });
};

// Controller to handle user signup
exports.signup = async (req, res) => {
  const { username, password, role } = req.body;

  // Validate required fields
  if (!username || !password || !role) {
    return sendErrorResponse(
      res,
      400,
      "Username, password, and role are required."
    );
  }

  // Check if the role is valid
  if (role !== "user" && role !== "vendor") {
    return sendErrorResponse(res, 400, "Role is not allowed for signup");
  }

  try {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 8);
    const newUser = new User({ username, password: hashedPassword, role });

    // Save the user to the database
    const savedUser = await newUser.save();

    // If the role is "vendor", also create a corresponding vendor entry
    if (role === "vendor") {
      const newVendor = new Vendor({ name: username, user: savedUser._id });
      await newVendor.save();
    }

    // Respond with the saved user data
    res.status(201).json({
      success: true,
      message: "User successfully registered",
      user: savedUser,
    });
  } catch (error) {
    // Handle errors during signup
    return sendErrorResponse(res, 500, "Error during signup", error);
  }
};

// Controller to handle user login
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Validate required fields
  if (!username || !password) {
    return sendErrorResponse(res, 400, "Username and password are required.");
  }

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    // Handle case where user is not found
    if (!user) {
      return sendErrorResponse(res, 400, "User not found");
    }

    // Compare the password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Handle invalid password
    if (!isPasswordValid) {
      return sendErrorResponse(res, 400, "Invalid password");
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign(
      { _id: user._id, role: user.role }, // Payload with user id and role
      process.env.JWT_SECRET, // Secret for signing the token
      { expiresIn: "1h" } // Expiry time for the token
    );

    // Send the token in the response header and body
    res.header("Authorization", token).status(200).json({
      success: true,
      message: "Login successful",
      jwt: token,
    });
  } catch (error) {
    // Handle errors during login
    return sendErrorResponse(res, 500, "Error during login", error);
  }
};

// Controller to retrieve paginated list of users
exports.getUsers = async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch users with "user" role and apply pagination
    const users = await User.find({ role: "user" }).skip(skip).limit(limit);

    // Get the total count of users
    const totalCount = await User.countDocuments({ role: "user" });

    // Respond with paginated data
    return res.status(200).json({
      success: true,
      users,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      perPage: limit,
    });
  } catch (error) {
    // Handle errors while fetching users
    return sendErrorResponse(res, 500, "Failed to retrieve users", error);
  }
};

// Controller to retrieve paginated list of vendors
exports.getVendors = async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch vendors and populate the associated user data
    const vendors = await Vendor.find()
      .skip(skip)
      .limit(limit)
      .populate("user");

    // Get the total count of vendors
    const totalCount = await Vendor.countDocuments();

    // Respond with paginated data
    return res.status(200).json({
      success: true,
      vendors,
      totalCount,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page,
      perPage: limit,
    });
  } catch (error) {
    // Handle errors while fetching vendors
    return sendErrorResponse(res, 500, "Failed to retrieve vendors", error);
  }
};
