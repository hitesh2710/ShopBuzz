import React, { Fragment } from "react";
import CartItemCard from "./CartItemCard.js";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../actions/cartAction.js";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/Header/MetaData.js";
function Cart() {
  const { cartItem } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const increaseQuantity = (id, quantity, stock) => {
    if (quantity < stock) {
      dispatch(addProductToCart(id, quantity + 1));
    }
  };
  const decreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      dispatch(addProductToCart(id, quantity - 1));
    }
  };
  const checkOutHandler=()=>
  {
   navigate("/login?redirect=shipping")
  }

  return (
    <Fragment>
      <MetaData title="Cart"></MetaData>
      {cartItem.length === 0 ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />
          <Typography>Your ShopBuzz Cart is empty</Typography>
          <Link to="/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Sub Total</p>
            </div>
            {cartItem.map((item) => (
              <div className="cartContainer" key={item.pid}>
                <CartItemCard item={item} />
                <div className="cartInput">
                  <button
                    onClick={() => decreaseQuantity(item.pid, item.quantity)}
                  >
                    -
                  </button>
                  <input type="number" readOnly value={item.quantity} />
                  <button
                    onClick={() =>
                      increaseQuantity(item.pid, item.quantity, item.stock)
                    }
                  >
                    +
                  </button>
                </div>
                <p className="cartSubtotal">{`₹${
                  item.quantity * item.price
                }`}</p>
              </div>
            ))}

            <div className="cartGrossTotal">
              <div></div>
              <div className="cartGrossTotalBox">
                <p>Gross Total</p>
                <p>{`₹${cartItem.reduce(
                  (tot, item) => tot + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkOutHandler}>CheckOut</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Cart;
