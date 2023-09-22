import React, { Fragment, useState } from "react";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/userAction";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "./Header.css";
function Options({ user }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { cartItem } = useSelector((state) => state.cartReducer);
  const navigate = useNavigate();
  const alert = useAlert();
  let order = () => {
    navigate("/orders");
  };
  let profile = () => {
    navigate("/account");
  };
  let logoutuser = () => {
    dispatch(logout());
    alert.success("Logout Successfull!");
  };
  let dashboard = () => {
    navigate("admin/dashboard");
  };
  let cart = () => {
    navigate("/cart");
  };

  let opt = [
    {
      icon: <ListAltIcon />,
      name: "Orders",
      func: order,
    },
    {
      icon: <PersonIcon />,
      name: "Profile",
      func: profile,
    },

    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItem.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItem.length})`,
      func: cart,
    },
    {
      icon: <ExitToAppIcon />,
      name: "Logout",
      func: logoutuser,
    },
  ];

  if (user.role === "admin") {
    opt.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }}></Backdrop>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : profile}
            alt="Profile"
          />
        }
      >
        {opt.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
}

export default Options;
