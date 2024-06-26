const ErrorHandler = require("../utils/errorHandling");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb Id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // Mongooose duplicte Key error
  if (err.code === 11000) {
    const message = `duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json  web Token is Invalid Try again `;
    err = new ErrorHandler(message, 400);
  }

  //JWT Expire error
  if (err.name === "JsonWebTokenError") {
    const message = `Json  web Token is Expired Try again `;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
