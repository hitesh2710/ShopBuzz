import {MdAccountCircle } from "react-icons/md";
import {MdSearch } from "react-icons/md";
import {MdAddShoppingCart } from "react-icons/md";
import React from 'react'
import {ReactNavbar} from "overlay-navbar";
import logo from "../../../images/logo.png"
const options = {
    burgerColorHover: "#eb4034",
    logo,
    logoWidth: "20vmax",
    navColor1: "white",
    logoHoverColor: "white",
    link1Text: "Home",
    link2Text: "Products",
    link3Text: "Contact",
    link4Text: "About",
    link1Url: "/",
    link2Url: "/products",
    link3Url: "/contact",
    link4Url: "/about",
    link1Size: "1.3vmax",
    link1Color: "rgba(35, 35, 35,0.8)",
    nav1justifyContent: "flex-end",
    nav2justifyContent: "flex-end",
    nav3justifyContent: "flex-start",
    nav4justifyContent: "flex-start",
    link1ColorHover: "#eb4034",
    link1Margin: "1vmax",
    profileIcon:true,
    profileIconUrl:'/login',
    profileIconColor: "rgba(35, 35, 35,0.8)",
    ProfileIconElement: MdAccountCircle, 
    searchIcon:true,
    searchIconColor: "rgba(35, 35, 35,0.8)",
    SearchIconElement:MdSearch,
    searchIconMargin:'10px',
    profileIconMargin:'10px',
    cartIconMargin:'10px',
    cartIcon:true,
    cartIconColor: "rgba(35, 35, 35,0.8)",
    CartIconElement:MdAddShoppingCart,
    
  };

function Header() {
  return (
    <ReactNavbar {...options}></ReactNavbar>
  )
}

export default Header