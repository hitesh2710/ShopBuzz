const express=require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controller/orderController");
const { isAuthenticated, isAuthorized } = require("../middleware/auth");
const orderRouter=express.Router();

orderRouter
.route('/order/me')
.get(isAuthenticated,myOrders)

orderRouter
.route('/order/new')
.post(isAuthenticated,newOrder);

orderRouter
.route('/order/:id')
.get(isAuthenticated,getSingleOrder)


orderRouter
.route('/admin/orders')
.get(isAuthenticated,isAuthorized("admin"),getAllOrders)

orderRouter
.route('/admin/order/:id')
.put(isAuthenticated,isAuthorized("admin"),updateOrder)
.delete(isAuthenticated,isAuthorized("admin"),deleteOrder)



module.exports=orderRouter;