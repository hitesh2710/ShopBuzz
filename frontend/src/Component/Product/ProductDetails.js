import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearError,
  getProductDetails,
  newReview,
} from "../../actions/productaction";
import Loader from "../layout/Loader/Loader";
import { Rating } from "@material-ui/lab";
import Reviewcard from "./ReviewCard.js";
import "./ProductDetails.css";
import { useAlert } from "react-alert";
import MetaData from "../layout/Header/MetaData";
import { addProductToCart } from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

function ProductDetails() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { product, loading, error } = useSelector(
    (state) => state.ProductDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReviewReducer
  );
  const increaseQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const addToCart = () => {
    dispatch(addProductToCart(id, quantity));
    alert.success("Item Added Successfully !");
  };
  const submitReviewToggle = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Review Added Successfully !");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    if (reviewError) {
      alert.error(error);
      dispatch(clearError());
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, success, reviewError]);

  const options = {
    size: "large",
    value: product.numOfReviews>=1?product.rating:0,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`ShopBuzz : ${product.name}`}></MetaData>

          <div className="ProductDetails">
            <div>
              <Carousel className="carousel">
                {product.images &&
                  product.images.map((it, id) => (
                    <img className="setimg" src={it.url} alt="Product" />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>

              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCart}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button className="submitReview" onClick={submitReviewToggle}>
                Submit Review
              </button>
            </div>
          </div>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              ></Rating>
              <textarea
                className="submitDialogTextArea"
                cols={30}
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          <h3 className="reviewsHeading">Reviews</h3>
          {product.review && product.review.length > 0 ? (
            <div className="reviews">
              {product.review.map((rev) => (
                <Reviewcard review={rev} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews!</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default ProductDetails;
