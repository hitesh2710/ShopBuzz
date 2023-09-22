import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getProduct } from "../../actions/productaction";
import Loader from "../layout/Loader/Loader.js";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { useState } from "react";
import { Slider, Typography } from "@material-ui/core";
import {useAlert} from 'react-alert'
import "./Product.css";
import MetaData from "../layout/Header/MetaData";


function Products() {
  const dispatch = useDispatch();
  const [Category, setCategory] = useState("");
  const alert=useAlert();
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 50000]);
  const handlePrice = (e, newPrice) => {
    setPrice(newPrice);
  };
  const [rating, setRating] = useState(0);
  const handleRating = (e, newRating) => {
    setRating(newRating);
  };
  const {
    products,
    loading,
    error,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const categories = [
    "Mobile",
    "Laptop",
    "Camera",
    "Footwear",
    "Tops",
    "Bottom",
    "Attire",
  ];

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  useEffect(() => {
    if(error)
    {
      alert.error(error)
      dispatch(clearError())
    }
    dispatch(getProduct(params.keyword, currentPage, price, Category,rating));
  }, [dispatch, params.keyword, currentPage, price, Category,rating,alert,error]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={'ShopBuzz : Products'}></MetaData>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product}></ProductCard>
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={handlePrice}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={50000}
            />
            <Typography>Categories</Typography>
            <ol className="categoryBox">
              {categories.map((item) => (
                <li
                  className="category-link"
                  key={item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </li>
              ))}
            </ol>
            <fieldset>
              <Typography component="legend">Rating</Typography>
              <Slider
                value={rating}
                onChange={handleRating}
                valueLabelDisplay="auto"
                aria-labelledby="continous-slider"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < filteredProductsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={filteredProductsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default Products;
