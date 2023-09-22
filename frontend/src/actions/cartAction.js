import axios from "axios";
import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cart";

// Add to Cart
export const addProductToCart =
  (id, quantity) => async (dispatch, getState) => {
    const link = `/api/v1/product/${id}`;

    //  Small version of postman
    const { data } = await axios.get(link);
    dispatch({
      type: ADD_TO_CART,
      payload: {
        pid: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity,
      },
    });
    localStorage.setItem(
      "cartItem",
      JSON.stringify(getState().cartReducer.cartItem)
    );
  };

// Remove From Cart
export const removeProductFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: id,
  });
  localStorage.setItem(
    "cartItem",
    JSON.stringify(getState().cartReducer.cartItem)
  );
};

//Saving Shipping Info

export const saveShippingInfo = (data) => async (dispatch,getState) => {
  dispatch({
    type:SAVE_SHIPPING_INFO,
    payload:data
  });
  localStorage.setItem("shippingInfo",JSON.stringify(getState().cartReducer.shippingInfo))
};
