const productModel = require("../models/productModel");
const ErrorHandler = require("../util/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../util/apiFeatures");
const cloudinary = require("cloudinary");
// Adding New Product(admin route)
module.exports.createProduct = catchAsyncErrors(async (req, res) => {
  let imageLinks = [];
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "Products",
    });
    imageLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  req.body.images = imageLinks;
  req.body.user = req.user._id;
  const product = await productModel.create(req.body);
  res.status(200).json({
    success: true,
    message: "Product Created Successfully",
    product,
  });
});

// Update Product
module.exports.updateProduct = catchAsyncErrors(async function updateProduct(
  req,
  res,
  next
) {
  const id = req.params.id;
  const product = await productModel.findById(id);

  // Images deletion from cloudinary by taking data from mongodb
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    // Uplaoding the new image which we got from req.body
    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "Products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLinks;
  }

  if (product) {
    const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      message: "Product Updated Successfully!",
      success: true,
      data: updatedProduct,
    });
  } else {
    return next(new ErrorHandler("Product Not Found!", 500));
  }
});

// Get all the products
module.exports.getAllProducts = catchAsyncErrors(async function getAllProducts(
  req,
  res,
  next
) {
  // return next(new ErrorHandler("This is new error!",400))
  const productPerPage = 7;

  // Count No. of Doucument in the productModel
  const productCount = await productModel.countDocuments();

  const apiFeature = new ApiFeatures(productModel.find(), req.query)
    .search()
    .filter();

  let pro = await apiFeature.query;

  let filteredProductsCount = pro.length;

  const apiFeature1 = new ApiFeatures(productModel.find(), req.query)
    .search()
    .filter()
    .pagination(productPerPage);

  let products = await apiFeature1.query;

  res.status(200).json({
    message: "Products Retreived Successfully!",
    products,
    productCount,
    productPerPage,
    filteredProductsCount,
  });
});

// Get all the products for Admin
module.exports.getProductForAdmin = catchAsyncErrors(
  async function getAllProducts(req, res, next) {
    const products = await productModel.find();

    res.status(200).json({
      message: "Products Retreived Successfully!",
      products,
    });
  }
);

// Delete A product
module.exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const data = await productModel.findById(req.params.id);
  if (data) {
    for (let i = 0; i < data.images.length; i++) {
      await cloudinary.v2.uploader.destroy(data.images[i].public_id);
    }
    await productModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully!",
      data: data,
    });
  } else {
    return next(new ErrorHandler("Product Not Found!", 500));
  }
});

// Get Product Details
module.exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const data = await productModel.findById(req.params.id);

  if (data) {
    res.status(200).json({
      message: "Product Details!",
      product: data,
    });
  } else {
    return next(new ErrorHandler("Product Not Found!", 500));
  }
});

// Create/Update review
module.exports.createReview = catchAsyncErrors(async (req, res, next) => {
  const reviewObj = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(req.body.rating),
    comment: req.body.comment,
  };

  let product = await productModel.findById(req.body.productId);

  const isReviewed = product.review.find(
    (element) => element.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.review.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.rating = Number(req.body.rating);
        rev.comment = req.body.comment;
      }
    });
  } else {
    product.review.push(reviewObj);
    product.numOfReviews = product.review.length; // product is now in local storage so push is updated therefore no +1 in length
  }

  let avg = 0;
  product.review.forEach((rev) => {
    avg += rev.rating;
  });

  avg = avg / product.numOfReviews;
  product.rating = avg;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    message: "Review creation/updation Successfull!",
    success: true,
    product,
  });
});

// Get All the productReview
module.exports.getAllProductReview = catchAsyncErrors(
  async (req, res, next) => {
    let product = await productModel.findById(req.query.productId);
    if (!product) {
      return next(new ErrorHandler("Product Not Found!", 404));
    }
    const review = product.review;
    res.status(200).json({
      message: "Review Retrieved Successfully!",
      review,
    });
  }
);

// Delete A Particular Review By it's ID
module.exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  let product = await productModel.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product Not Found!", 404));
  }
  const updatedReview = product.review.filter((rev) => {
    return rev._id.toString() !== req.query.id.toString();
  });

  let avg = 0;
  updatedReview.forEach((rev) => {
    avg += rev.rating;
  });
  let rating = 0;
  numOfReviews = updatedReview.length;
  if (numOfReviews > 0) {
    avg = avg / numOfReviews;
    rating = avg;
  }
  await productModel.findByIdAndUpdate(
    req.query.productId,
    { review: updatedReview, rating: rating, numOfReviews },
    { new: true, runValidators: true, useFindAndModify: false }
  );

  res.json({
    message: "review Deleted Successfully!",
    success: true,
  });
});
