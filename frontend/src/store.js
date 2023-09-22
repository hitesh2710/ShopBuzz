import { configureStore } from "@reduxjs/toolkit";
import {
  deleteReviewReducer,
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productOperationReducer,
  productReducer,
  reviewReducer,
} from "./reducers/productReducer";
import {
  AdminUserReducer,
  forgotPasswordReducer,
  updateUserReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { AdminOrderReducer, myOrderReducer, newOrderReducer, orderDetailReducer, orderOperationReducer } from "./reducers/orderReducer";

let initialState = {
  cartReducer: {
    cartItem: localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  ProductDetails:{
    detailReq:1,
    product: {}
  }

};

const store = configureStore({
  reducer: {
    products: productReducer,
    ProductDetails: productDetailsReducer,
    userReducer: userReducer,
    updateUserReducer: updateUserReducer,
    forgotPasswordReducer: forgotPasswordReducer,
    cartReducer: cartReducer,
    newOrderReducer:newOrderReducer,
    myOrderReducer:myOrderReducer,
    orderDetailReducer:orderDetailReducer,
    newReviewReducer:newReviewReducer,
    newProductReducer:newProductReducer,
    productOperationReducer:productOperationReducer,
    AdminOrderReducer:AdminOrderReducer,
    orderOperationReducer:orderOperationReducer,
    AdminUserReducer:AdminUserReducer,
    userDetailsReducer:userDetailsReducer,
    deleteReviewReducer:deleteReviewReducer,
    reviewReducer:reviewReducer
  },
  preloadedState: initialState,
});

export default store;
