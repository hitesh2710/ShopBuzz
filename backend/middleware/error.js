const ErrorHandler = require("../util/errorHandler");
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  if (err.code === 11000) {
    const message = `Duplicate:${Object.keys(err.keyValue)}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name == "TokenExpiredError") {
    const message = "JSON Web Token has Expired!";
    err = new ErrorHandler(message, 400);
  }

  if (err.name == "JsonWebTokenError") {
    const message = "JSON Web Token is Invalid!";
    err = new ErrorHandler(message, 400);
  }

  // Wrong Mongodb ID
  if (err.name === "CastError") {
    const message = `Invalid:${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    message: err.message,
  });
};
