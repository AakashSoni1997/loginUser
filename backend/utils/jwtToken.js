const Cookies = require("universal-cookie");

const sendToken = (user, statusCode, res) => {
  // Validate input parameters
  if (!user || !res) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid input parameters" });
  }

  const token = user.getJWTToken();

  // Validate token
  if (!token) {
    return res
      .status(500)
      .json({ success: false, message: "Error generating token" });
  }

  // Options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Set cookie and send response
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
