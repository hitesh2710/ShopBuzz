const userModel = require("../models/userModel");
const ErrorHandler = require("../util/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("Please Login To Continue!", 401));
  }
  const decoded = jwt.verify(token, process.env.secretKey);

  req.user = await userModel.findById(decoded.id);

  next();
});

exports.isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (req.user != null && !roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Access Denied To ${req.user.role}`, 403));
    }

    next();
  };
};
