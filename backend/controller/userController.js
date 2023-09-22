const ErrorHandler = require("../util/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const userModel = require("../models/userModel");
const sendTokenAndCookies = require("../util/sendTokenAndCookies");
const sendEmail = require("../util/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

// Register A user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const upload = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const user = await userModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: upload.public_id,
      url: upload.secure_url,
    },
  });

  sendTokenAndCookies(user, 201, res);
});

// Login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new ErrorHandler("Please enter correct email and password!", 400)
    );
  }

  const user = await userModel.findOne({ email: email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password!", 401));
  }

  const Passwordmatched = await user.comparePassword(password);

  if (!Passwordmatched) {
    return next(new ErrorHandler("Invalid email or password!", 401));
  }

  sendTokenAndCookies(user, 200, res);
});

// Logout
exports.logout = catchAsyncErrors((req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    message: "Logout Successfull!",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  //  use of Findone is necessary else in find it gives empty array
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("Invalid Email !", 404));
  }

  const token = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // `http://localhost/api/v1/password/reset/${token}`

  const link = `${req.protocol}://${req.get("host")}/password/reset/${token}`;

  // const link = `${process.env.FRONTEND}/password/reset/${token}`;
  const message = `We heard that you lost your password. Sorry about that!\nBut don’t worry! You can use the following link to reset your password:${link}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "[ShopBuzz] Please reset your password",
      message,
    });
    res.status(200).json({
      message: `Reset Password Link Successfully sent to ${user.email}`,
    });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(err.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Generating hashed Token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await userModel.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorHandler("Token is invalid or has expired!", 400));
  }
  if (req.body.password != req.body.confirmPassword) {
    return next(new ErrorHandler("Password Doesn't Match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendTokenAndCookies(user, 200, res);
});

// User Details
exports.userDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  res.status(200).json({
    message: "User Details",
    user,
  });
});

// Update Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findById(req.user._id).select("+password");

  const Passwordmatched = await user.comparePassword(req.body.oldPassword);

  if (!Passwordmatched) {
    return next(new ErrorHandler("Invalid password!", 401));
  }

  if (req.body.newPassword != req.body.confirmPassword) {
    return next(new ErrorHandler("Password Doesn't Match!", 401));
  }

  user.password = req.body.newPassword;
  await user.save();
  sendTokenAndCookies(user, 200, res);
});

// Update User Details
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  let updateObj = {
    name: req.body.name,
    email: req.body.email,
  };
  if (req.body.avatar !== "") {
    let user = await userModel.findById(req.user._id);
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);

    const upload = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    updateObj.avatar = {
      public_id: upload.public_id,
      url: upload.secure_url,
    };
  }

  const user = await userModel.findByIdAndUpdate(req.user._id, updateObj, {
    new: true, // return the modified content
    runValidators: true,
    useFindAndModify: false, //if data does not exist it will not create new
  });

  res.status(200).json({
    message: true,
    success: true,
    user,
  });
});

// Get all users(---admin)
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await userModel.find();

  res.status(200).json({
    message: "users Retreived!",
    users,
  });
});

// Get a particular user Detail(---admin)
exports.getUser = catchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  // if (!user) {
  //   return next(new ErrorHandler(`No User with id: ${req.params.id}`, 400));
  // }

  res.status(200).json({
    message: "user Retreived!",
    user,
  });
});

// Update User Role(---admin)
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  let updateObj = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await userModel.findByIdAndUpdate(req.params.id, updateObj, {
    new: true, // return the modified content
    runValidators: true,
    useFindAndModify: false, //if data does not exist it will not create new
  });

  if (!user) {
    return next(new ErrorHandler(`No User with id: ${req.params.id}`, 400));
  }

  res.status(200).json({
    message: "Role updated Successfully!",
    success: true,
    user,
  });
});

// Delete User(--admin)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  //  Avatar will  deleted in future(cloudinary)

  const user = await userModel.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new ErrorHandler(`No User with id: ${req.params.id}`, 400));
  }

  res.status(200).json({
    message: "User Deleted Successfully!",
    success: true,
    user,
  });
});
