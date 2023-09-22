import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/Header/MetaData";
import SideBar from "./SideBar";
import { useNavigate, useParams } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { Button } from "@material-ui/core";
import Loader from "../layout/Loader/Loader";
import {
  clearError,
  loadUser,
  updateUserAdmin,
  userDetailsAdmin,
} from "../../actions/userAction";
import { UPDATE_USER_RESET } from "../../constants/userConstants";

function UpdateUser() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [name, setName] = useState("");
  const [email, setEmail] = useState(0);
  const [role, setRole] = useState("");

  const { error, loading, user } = useSelector(
    (state) => state.userDetailsReducer
  );
  
  const {
    error: updateError,
    loading: updateLoading,
    isUpdated,
  } = useSelector((state) => state.updateUserReducer);

  const { id } = useParams();
  const submitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUserAdmin(id, myForm));
  };

  useEffect(() => {
    if (user && user._id !== id) {
      dispatch(userDetailsAdmin(id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearError());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      dispatch(loadUser()) 
      navigate("/admin/users");
      
      
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated, updateError, user, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <div className="dashboard">
            <SideBar></SideBar>
            <MetaData title="Update User"></MetaData>
            <div className="newProductContainer">
              <form
                className="createProductForm"
                encType="multipart/form-data"
                onSubmit={submitHandler}
              >
                <h1>Update Product</h1>
                <div>
                  <PersonIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <MailOutlineIcon />
                  <input
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <VerifiedUserIcon />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Choose Role</option>

                    <option key={1} value="admin">
                      Admin
                    </option>
                    <option key={2} value="user">
                      User
                    </option>
                  </select>
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={updateLoading ? true : false}
                >
                  Update
                </Button>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default UpdateUser;
