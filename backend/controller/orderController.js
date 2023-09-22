const ErrorHandler = require("../util/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");

// Creating new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItem,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await orderModel.create({
    shippingInfo,
    orderItem,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user._id,
    paidAt: Date.now(),
  });

  res.status(201).json({
    message: "Order Created Successfully!",
    order,
  });
});

// Get Single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await orderModel
    .findById(req.params.id)
    .populate("user", "name email");
     
  if (!order) {
    return next(new ErrorHandler("Order Not Found with this id!", 404));
  }

  res.status(200).json({
    message: "Order Retreived Successfully!",
    order,
  });
});

// Get LoggedIn User order
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const order = await orderModel.find({ user: req.user._id });

  res.status(200).json({
    message: "Order Retreived Successfully!",
    order,
  });
});

// Get All orders ---admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await orderModel.find();

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    message: "Order Retreived Successfully!",
    totalAmount,
    orders,
  });
});

// Update Order Status orders ---admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus == "Delivered") {
    return next(new ErrorHandler("Order is already delivered", 404));
  }

 if(req.body.status==="Shipped")
 {
  order.orderItem.forEach(async (order) => {
    await updateStock(order.pid, order.quantity);
  });
 }

  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") order.deliveredAt = Date.now();

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    message: `Order ${req.body.status} Successfully!`,
    success:true
  });
});

async function updateStock(id, quantity) {
  const product = await productModel.findById(id);
  if(product.stock<=0)
  {
    return next(new ErrorHandler("Product is Out Of Stock", 500));
  }
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// Delete order
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this Id", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    message: "Order Deleted Successfully!",
    success:true
  });
});
