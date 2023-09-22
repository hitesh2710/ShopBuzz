import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cart";

export const cartReducer = (state = { cartItem: [],shippingInfo:{} }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const isPresent = state.cartItem.find(
        (product) => product.pid === action.payload.pid
      );
      if (isPresent) {
        return {
          ...state,
          cartItem: state.cartItem.map((product) =>
            product.pid === action.payload.pid ? action.payload : product
          ),
        };
      } else {
        return {
          ...state,
          cartItem: [...state.cartItem, action.payload],
        };
      }

    case REMOVE_FROM_CART:
      const updatedItems = state.cartItem.filter(
        (item) => item.pid !== action.payload
      );
      return {
        ...state,
        cartItem: updatedItems,
      };

    case SAVE_SHIPPING_INFO:
      return{
        ...state,
        shippingInfo:action.payload

      }  
    default:
      return state;
  }
};
