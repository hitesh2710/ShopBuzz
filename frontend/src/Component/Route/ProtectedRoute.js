import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ isAdmin, children }) {
  const { isAuthenticated, loading, user } = useSelector(
    (state) => state.userReducer
  );
  return (
    <Fragment>
      {loading === false ? (
        isAuthenticated === true ? (
          isAdmin === true ? (
            user.role === "admin" ? (
              children
            ) : (
              <Navigate to="/login" />
            )
          ) : (
            children
          )
        ) : (
          <Navigate to="/login" />
        )
      ) : (
        <></>
      )}
    </Fragment>
  );
}

export default ProtectedRoute;
