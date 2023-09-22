import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  clearError,
  deleteProduct,
  getAdminProduct,
  getProductDetails,
} from "../../actions/productaction";
import { DataGrid } from "@material-ui/data-grid";
import "./AllProducts.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import SideBar from "./SideBar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MetaData from "../layout/Header/MetaData.js";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

function AllProducts() {
  const { error, products } = useSelector((state) => state.products);
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };
  const EditProductHandler = (link, id) => {
    dispatch(getProductDetails(id));
    navigate(link);
  };
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.productOperationReducer
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (deleteError) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isDeleted) {
      alert.success("Product Deleted Successfully !");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getAdminProduct());
  }, [dispatch, error, alert, isDeleted, deleteError]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.4,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                EditProductHandler(
                  `/admin/product/${params.getValue(params.id, "id")}`,
                  params.getValue(params.id, "id")
                )
              }
            >
              <EditIcon />
            </Button>

            {/* <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                  <EditIcon />
                </Link> */}

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products!==undefined &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
    });
  return (
    <Fragment>
      <MetaData title="All Products - Admin"></MetaData>
      <div className="dashboard">
        <SideBar></SideBar>
        <div className="productListContainer">
          <h1 id="productListHeading">All Products</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          ></DataGrid>
        </div>
      </div>
    </Fragment>
  );
}

export default AllProducts;
