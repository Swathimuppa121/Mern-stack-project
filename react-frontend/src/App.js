import React from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import HeaderComponent from "./components/HeaderComponent";
//import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from "./components/CreateEmployeeComponent";
import UpdateEmployeeComponent from "./components/UpdateEmployeeComponent";
import ViewEmployeeComponent from "./components/ViewEmployeeComponent";
import LoginFormComponent from "./components/LoginFormComponent";
import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token from local storage
    history.push("/login"); // redirect to login page
  };

  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route path="/" exact component={LoginFormComponent}></Route>
            <Route path="/login" component={LoginFormComponent}></Route>
            <ProtectedRoute
              path="/employees"
              component={ListEmployeeComponent}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/add-employee/:id"
              component={CreateEmployeeComponent}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/view-employee/:id"
              component={ViewEmployeeComponent}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/update-employee/:id"
              component={UpdateEmployeeComponent}
            ></ProtectedRoute>
            {/* <Route path = "/update-employee/:id" component = {UpdateEmployeeComponent}></Route> */}
          </Switch>
        </div>
        {/* <FooterComponent /> */}
      </Router>
    </div>
  );
}

export default App;
