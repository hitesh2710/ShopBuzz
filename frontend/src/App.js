import { useEffect, useState } from 'react';
import './App.css';
import Header from './Component/layout/Header/Header.js';
import {Route, Routes,BrowserRouter as Router} from "react-router-dom"
import WebFont from 'webfontloader';
import Footer from './Component/layout/Footer/Footer.js';
import Home from './Component/Home/Home.js'
import ProductDetails from './Component/Product/ProductDetails.js'
import Products from './Component/Product/Products.js'
import Search from './Component/Product/Search.js'
import UserLoginSignUp from './Component/User/UserLoginSignUp';
import store from './store'
import { loadUser } from './actions/userAction';
import { useSelector } from 'react-redux';
import Options from './Component/layout/Header/Options.js'
import Profile from './Component/User/Profile.js'
import ProtectedRoute from './Component/Route/ProtectedRoute';
import UpdateProfile from './Component/User/UpdateProfile.js'
import UpdatePassword from './Component/User/UpdatePassword.js'
import ForgotPassword from './Component/User/ForgotPassword.js'
import ResetPassword from './Component/User/ResetPassword.js'
import Cart from './Component/Cart/Cart.js'
import Shipping from './Component/Cart/Shipping.js'
import Confirm from './Component/Cart/Confirm.js'
import Payment from './Component/Cart/Payment.js'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import OrderSuccess from './Component/Cart/OrderSuccess.js'
import MyOrder from './Component/Order/MyOrder.js'
import OrderDetail from './Component/Order/OrderDetail.js'
import Dashboard from './Component/Admin/Dashboard.js'
import AllProducts from './Component/Admin/AllProducts.js'
import NewProduct from './Component/Admin/NewProduct.js'
import UpdateProduct from './Component/Admin/UpdateProduct.js'
import AllOrders from './Component/Admin/AllOrders.js'
import UpdateOrder from './Component/Admin/UpdateOrder.js'
import AllUsers from './Component/Admin/AllUsers.js'
import UpdateUser from './Component/Admin/UpdateUser.js'
import AllReviews from './Component/Admin/AllReviews.js'
import Contact from './Component/Contact/Contact.js'
import About from './Component/About/About.js'
import axios from 'axios';
import NotFound from './Component/layout/NotFound/NotFound';


function App() {
  const {isAuthenticated,user} = useSelector(state=>state.userReducer)
  const [stripeApiKey,setStripeApiKey]=useState("")
  
   async function getApiKey()
  {
    
    let {data}=await axios.get("/api/v1/stripeapikey")
    setStripeApiKey(data.stripeApiKey)
  }

  window.addEventListener("contextmenu",(e)=>e.preventDefault())
  useEffect(()=>
  {
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
    store.dispatch(loadUser())  //Alternate way to use Dispatch
    getApiKey()

  },[])

  
  return (
    <Router>
      <Header/>
      {isAuthenticated===true && <Options user={user}/>}
      <Routes>
      <Route exact path='/' Component={Home}></Route>
      <Route exact path="/login" Component={UserLoginSignUp}></Route>
      <Route exact path="/contact" Component={Contact}></Route>
      <Route exact path="/about" Component={About}></Route>
      <Route exact path="/product/:id" Component={ProductDetails}></Route>
      <Route exact path="/products" Component={Products}></Route>
      <Route exact path="/products/:keyword" Component={Products}></Route>
      <Route exact path='/account' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
      <Route exact path="/search" Component={Search}></Route>
      <Route exact path='/password/update' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
      <Route exact path='/profile/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
      <Route exact path="/password/forgot" Component={ForgotPassword}></Route>
      <Route exact path="/password/reset/:token" Component={ResetPassword}></Route>
      <Route exact path="/cart" Component={Cart}></Route>
      <Route exact path='/shipping' element={<ProtectedRoute><Shipping/></ProtectedRoute>}/>
      <Route exact path='/order/confirm' element={<ProtectedRoute><Confirm/></ProtectedRoute>}/>
      {stripeApiKey && <Route exact path='/payment/process' element={<Elements stripe={loadStripe(stripeApiKey)}><ProtectedRoute><Payment/></ProtectedRoute></Elements>}/>}
      <Route exact path='/success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>}/>
      <Route exact path='/orders' element={<ProtectedRoute><MyOrder/></ProtectedRoute>}/>
      <Route exact path='/order/:id' element={<ProtectedRoute><OrderDetail/></ProtectedRoute>}/>
      <Route exact path='/admin/dashboard' element={<ProtectedRoute isAdmin={true}><Dashboard/></ProtectedRoute>}/>
      <Route exact path='/admin/products' element={<ProtectedRoute isAdmin={true}><AllProducts/></ProtectedRoute>}/>
      <Route exact path='/admin/product' element={<ProtectedRoute isAdmin={true}><NewProduct/></ProtectedRoute>}/>
      <Route exact path='/admin/product/:id' element={<ProtectedRoute isAdmin={true}><UpdateProduct/></ProtectedRoute>}/>
      <Route exact path='/admin/orders' element={<ProtectedRoute isAdmin={true}><AllOrders/></ProtectedRoute>}/>
      <Route exact path='/admin/order/:id' element={<ProtectedRoute isAdmin={true}><UpdateOrder/></ProtectedRoute>}/>
      <Route exact path='/admin/users' element={<ProtectedRoute isAdmin={true}><AllUsers/></ProtectedRoute>}/>
      <Route exact path='/admin/user/:id' element={<ProtectedRoute isAdmin={true}><UpdateUser/></ProtectedRoute>}/>
      <Route exact path='/admin/reviews' element={<ProtectedRoute isAdmin={true}><AllReviews/></ProtectedRoute>}/>
      <Route path="*" Component={NotFound}></Route>
      
    </Routes>
      <Footer/>
    </Router>
  );
}

export default App;


// "proxy": "http://192.168.0.103:5000",(wifi)
