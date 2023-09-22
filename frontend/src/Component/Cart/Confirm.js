import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/Header/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import "./Confirm.css";

function Confirm() {
  const { shippingInfo, cartItem } = useSelector((state) => state.cartReducer);
  const { user } = useSelector((state) => state.userReducer);
  const navigate=useNavigate()
  const subtotal = cartItem.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCharges = subtotal > 1000 ? 200 : 0;
  const gst = 0.18 * subtotal;
  const totalPrice = subtotal + shippingCharges + gst;
  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state},  ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const handlePayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      gst,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo",JSON.stringify(data));
    navigate('/payment/process')
  };
  return (
    <Fragment>
      <MetaData title="Confirm Order"></MetaData>
      <CheckoutSteps activeStep={1}></CheckoutSteps>
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Name:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items:</Typography>
            <div className="confirmCartItemsContainer">
              {cartItem &&
                cartItem.map((item) => (
                  <div key={item.pid}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.pid}`}>{item.name}</Link>
                    <span>
                      {item.quantity}X{`₹${item.price}`}=
                      <b>{`₹${item.price * item.quantity}`}</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>SubTotal:</p>
                <span>₹{subtotal}</span>
              </div>
              <div>
                <p>Shipping Charges:</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST:</p>
                <span>₹{gst}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total:</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
            <button onClick={handlePayment}>Proceed To Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Confirm;
