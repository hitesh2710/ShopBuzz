import React, { useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/Header/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getProduct } from "../../actions/productaction";
import Loader from "../layout/Loader/Loader.js"
import { useAlert } from "react-alert";
// const product={
//   name:"Blue Shirt",
//   price:"$2000",
//   image:[{url:"https://picsum.photos/seed/picsum/200/300"}],
//   _id:"hitesh123"
// }
function Home() {
  const dispatch = useDispatch();
  const alert=useAlert();
  let { loading, error, products } = useSelector(
    (state) => state.products
  );
 

  useEffect(() => {
    if(error)
    {
       alert.error(error);
       dispatch(clearError())
    }
      
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <>
    {
      
      loading?
      <Loader/>
      :
      <>
      <MetaData title={"ShopBuzz"} />

      <div className="banner">
        <p>Welcome to ShopBuzz</p>
        <h1>Find Amazing Products Below</h1>
        <a href="#container">
          <button>
          Scroll
            
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        {products &&
          products.map((product) => <ProductCard product={product} />)}
      </div>
    </>
    }
    </>
  );
}

export default Home;
