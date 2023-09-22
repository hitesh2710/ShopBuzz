import React, { Fragment, useEffect, useState } from "react";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import "./ForgotPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { clearError, forgotPassword } from "../../actions/userAction.js";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader.js";
import MetaData from "../layout/Header/MetaData";

function ForgotPassword() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { message, loading, error } = useSelector(
    (state) => state.forgotPasswordReducer
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (message) {
      alert.success(message);
    }
  }, [error, alert, dispatch, message]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h2 className="forgotPasswordHeading">Forgot Password</h2>
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                ></input>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default ForgotPassword;
