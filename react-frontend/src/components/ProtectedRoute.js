// ProtectedRoute.js
import React from "react";
import { Route, Redirect } from "react-router-dom";

const isAuthorized = (token) => {
  // Implement logic to check if the user is authorized to access the protected route
  // Return true if authorized, false otherwise
  // For example, you can check if the token is expired or if the user has the correct permissions
  return true; // Replace this with your own authorization logic
};
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Redirect to="/login" />;
  }
  if (!isAuthorized(token)) {
    return <Redirect to="/unauthorized" />;
  }
  return <Route {...rest} render={(props) => <Component {...props} />} />;
};

export default ProtectedRoute;
