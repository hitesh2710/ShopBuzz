import React, { Fragment, useEffect, useRef, useState } from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { Link, useLocation, useNavigate } from "react-router-dom";
import profile from "../../images/Profile.png";
import "./UserLoginSignUp.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, login, signup } from "../../actions/userAction.js";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader.js";
function UserLoginSignUp() {
  const switcherTab = useRef(null);
  const signUpTab = useRef(null);
  const loginTab = useRef(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setloginPassword] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location=useLocation()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState(profile);
  const [avatarPreview, setAvatarPreview] = useState(profile);
  const { name, email, password } = user;
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.userReducer
  );

  const signUpSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(signup(myForm));
  };
  const saveData = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        if (reader.readyState === 2) {
          //Reading of file is done then
          setAvatar(reader.result); //reader.result gives the url
          setAvatarPreview(reader.result);
        }
      };
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const loginSubmit = (e) => {
    e.preventDefault();

    dispatch(login(loginEmail, loginPassword));
  };
  const switchTab = (e, value) => {
    if (value === "login") {

      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      signUpTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    } else {
      switcherTab.current.classList.remove("shiftToNeutral");
      switcherTab.current.classList.add("shiftToRight");
      signUpTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "account";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated) {
      navigate(`/${redirect}`);
    }
  }, [error, alert, dispatch, isAuthenticated, navigate,redirect]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="LoginSignUpToggle">
                  <p onClick={(e) => switchTab(e, "login")}>Login</p>
                  <p onClick={(e) => switchTab(e, "signup")}>SignUp</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setloginPassword(e.target.value)}
                  ></input>
                </div>
                <Link to={"/password/forgot"}>Forgot Password</Link>
                <input type="submit" value="Login" className="loginBtn"></input>
              </form>
              <form
                className="signUpForm"
                ref={signUpTab}
                encType="multipart/form-data"
                onSubmit={signUpSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    required
                    value={name}
                    onChange={saveData}
                  ></input>
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    value={email}
                    onChange={saveData}
                  ></input>
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    required
                    value={password}
                    onChange={saveData}
                  ></input>
                </div>
                <div id="registerImage">
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
                  value="SignUp"
                  className="signUpBtn"
                ></input>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default UserLoginSignUp;
