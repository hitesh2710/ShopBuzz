import React, { Fragment, useRef } from "react";
import "./Payment.css";
import { useAlert } from "react-alert";
import MetaData from "../layout/Header/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { Typography } from "@material-ui/core";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { newOrder } from "../../actions/orderAction";
function Payment() {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const alert = useAlert();
  const payBtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useSelector((state) => state.userReducer);
  const { shippingInfo } = useSelector((state) => state.cartReducer);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const cartItem=JSON.parse(localStorage.getItem("cartItem"))
  //   Covert Into Paisa
  const paymentData = { amount: Math.round(orderInfo.totalPrice * 100) };
  const orderDetail={
    shippingInfo,
    orderItem:cartItem,
    itemsPrice:orderInfo.subtotal,
    taxPrice:orderInfo.gst,
    shippingPrice:orderInfo.shippingCharges,
    totalPrice:orderInfo.totalPrice

}

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(user);
    console.log(shippingInfo);
    payBtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );
      console.log(data.client_secret);

      const client_secret = data.client_secret;
      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });
      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          orderDetail.paymentInfo={
            id:result.paymentIntent.id,
            status:result.paymentIntent.status
          }
          console.log(orderDetail);
          dispatch(newOrder(orderDetail))
          navigate("/success");
        } else {
          alert.error("Payment Processing Error !");
          payBtn.current.disabled = false;
        }
      }
    } catch (error) {
      alert.error(error.response.data.message);
      payBtn.current.disabled = false;
    }
  };
  return (
    <Fragment>
      <MetaData title="Process Payment"></MetaData>
      <CheckoutSteps activeStep={2}></CheckoutSteps>
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={submitHandler}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>
          <input
            type="submit"
            className="paymentFormBtn"
            value={`Pay : ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
          ></input>
        </form>
      </div>
    </Fragment>
  );
}

export default Payment;
