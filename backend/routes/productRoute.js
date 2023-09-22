const express=require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createReview, getAllProductReview, deleteReview, getProductForAdmin } = require('../controller/productController');
const { isAuthenticated, isAuthorized } = require('../middleware/auth');

const productRouter=express.Router();
productRouter
.route('/products')
.get(getAllProducts)

productRouter
.route('/admin/products')
.get(isAuthenticated,isAuthorized("admin"),getProductForAdmin)

productRouter
.route('/admin/product/new')
.post(isAuthenticated,isAuthorized("admin"),createProduct)


productRouter
.route('/admin/product/:id')
.put(isAuthenticated,isAuthorized("admin"),updateProduct)
.delete(isAuthenticated,isAuthorized("admin"),deleteProduct)

productRouter
.route('/review')
.put(isAuthenticated,createReview)

productRouter
.route('/product/:id')
.get(getProductDetails)

productRouter
.route('/getReviews')
.get(getAllProductReview)
.delete(isAuthenticated,deleteReview)

module.exports=productRouter