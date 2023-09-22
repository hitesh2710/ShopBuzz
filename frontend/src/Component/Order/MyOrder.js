import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import MetaData from "../layout/Header/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { Typography } from "@material-ui/core";
import LaunchIcon from "@material-ui/icons/Launch";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";
import { clearErrors, myOrders } from "../../actions/orderAction";
import "./MyOrder.css";

function MyOrder() {
  const { user } = useSelector((state) => state.userReducer);
  const { orders, error, loading } = useSelector(
    (state) => state.myOrderReducer
  );
  const dispatch = useDispatch();
  const alert = useAlert();
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 0.5 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 220,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 275,
      flex: 0.3,
    },
    {
      field: "actions",
      flex: 0.2,
      headerName: "Actions",
      minWidth: 225,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItem.length,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <MetaData title={`${user.name} Orders`}></MetaData>
          <div className="myOrdersPage">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="myOrdersTable"
              autoHeight
            ></DataGrid>
            <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default MyOrder;
