const app = require("./app");
// const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const cloudinary=require('cloudinary')

// Handling uncaughtException
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting Down the server due to uncaughtException");
  process.exit(1);
});

// To retrieve variable from .env file
// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}


// connecting To database
connectDatabase();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.Port, () => {
  console.log(`Server is listening to http://localhost:${process.env.Port}`);
});

// unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Shutting Down the server due to unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
