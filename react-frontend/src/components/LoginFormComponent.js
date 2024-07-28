import React, { Component } from "react";

import axios from "axios";
import EmployeeService from "../services/EmployeeService";
import { updateToken } from "../services/axiosConfig";
import { withRouter } from "react-router-dom";
class LoginFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      token: "",
      error: "",
    };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const customer = { uname: this.state.username, pwd: this.state.password };
    EmployeeService.login(customer)
      .then((response) => {
        const token = response.data;
        this.setState({ token });
        localStorage.setItem("token", token);
        updateToken(token); // Update the token in axiosConfig.js

        this.props.history.push("/employees"); // Redirect to the /employees route
      })

      .catch((error) => {
        this.setState({ error: "Invalid Credentials" });
      });
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    updateToken(null); // Remove the token from axiosConfig.js
    alert("Tokens have been removed");
  };
  render() {
    const { username, password, error } = this.state;
    return (
      <div className="login-form">
        <form onSubmit={this.handleSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <br />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <br />
          <button type="submit">Login</button>
          <button type="button" onClick={this.handleLogout}>
            Logout
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    );
  }
}

export default withRouter(LoginFormComponent);
