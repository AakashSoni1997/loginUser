const ErrorHander = require("../utils/errorHandling");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");

///Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, username, contactInfo } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    username,
    contactInfo,
  });

  sendToken(user, 201, res);
});

//Login Users
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  /// Checking if User has given password and email both
  if (!email || !password) {
    return next(new ErrorHander("Please Enter email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHander("Invaild email and password", 401));
  }

  const isPasswordMatch = user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHander("Invaild email and password", 401));
  }

  sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Log Out Successfully",
  });
});

//GET ALL USERS (by admin)
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// DELETE USER
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(
      new ErrorHander(`User does not exist with id ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
