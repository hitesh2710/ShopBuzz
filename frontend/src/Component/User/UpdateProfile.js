import React, { Fragment, useEffect, useState } from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { useNavigate } from "react-router-dom";
import profile from "../../images/Profile.png";
import "./UpdateProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser, updateUser } from "../../actions/userAction.js";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader.js";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import MetaData from "../layout/Header/MetaData";

function UpdateProfile() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { isUpdated, loading, error } = useSelector(
    (state) => state.updateUserReducer
  );
  const { user } = useSelector((state) => state.userReducer);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateUser(myForm));
  };
  const saveData = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        if (reader.readyState === 2) {
          //Reading of file is done then
          console.log(reader.result);
          setAvatar(reader.result); //reader.result gives the url
          setAvatarPreview(reader.result);
        }
      };
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isUpdated) {
      alert.success("Profile Updated Successfully!");
      dispatch(loadUser());
      dispatch({ type: UPDATE_PROFILE_RESET });
      navigate("/account");
    }
  }, [error, alert, dispatch, isUpdated, navigate, user]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Profile" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Profile</h2>
              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>
                <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="User" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={saveData}
                  ></input>
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                ></input>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default UpdateProfile;
