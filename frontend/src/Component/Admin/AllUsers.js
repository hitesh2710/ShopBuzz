import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { DataGrid } from "@material-ui/data-grid";
import "./AllProducts.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";
import SideBar from "./SideBar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MetaData from "../layout/Header/MetaData.js";
import {
  clearError,
  deleteUserAdmin,
  getAllUsers,
  loadUser,
  userDetailsAdmin,
} from "../../actions/userAction";
import { DELETE_USER_RESET } from "../../constants/userConstants";

function AllUsers() {
  const { error, users } = useSelector((state) => state.AdminUserReducer);
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteUserHandler = (id) => {
    dispatch(deleteUserAdmin(id));
  };
  const EditUserHandler = (link, id) => {
    dispatch(userDetailsAdmin(id));
    navigate(link);
  };
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.updateUserReducer
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
      alert.success("User Deleted Successfully !");
      dispatch(loadUser());
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [dispatch, error, alert, isDeleted, deleteError]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.4,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 0.4,
    },
    {
      field: "role",
      headerName: "Role",
      type: "number",
      minWidth: 100,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
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
                EditUserHandler(
                  `/admin/user/${params.getValue(params.id, "id")}`,
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
                deleteUserHandler(params.getValue(params.id, "id"))
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

  users!==undefined &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
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

export default AllUsers;
