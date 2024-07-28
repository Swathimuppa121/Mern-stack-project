import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";
import { updateToken } from "../services/axiosConfig";
import { withRouter } from "react-router-dom";
class ListEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      token: "", // added token state
      isLoggedIn: true,
    };
    this.addEmployee = this.addEmployee.bind(this);
    this.editEmployee = this.editEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
    this.viewEmployee = this.viewEmployee.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.removeItem("token"); // remove token from local storage
    this.setState({ isLoggedIn: false });
  }

  deleteEmployee(id) {
    const token = localStorage.getItem("token"); // get token from local storage
    if (token) {
      EmployeeService.deleteEmployee(id, token).then((res) => {
        this.setState({
          employees: this.state.employees.filter(
            (employee) => employee.id !== id
          ),
        });
      });
    } else {
      // handle token not found error
      console.error("Token not found");
    }
  }
  handleLogout = () => {
    localStorage.removeItem("token");
    updateToken(null); // Remove the token from axiosConfig.js
    alert("Tokens have been removed");
    this.props.history.push("/login"); // Redirect to login p
  };
  viewEmployee(id) {
    this.props.history.push(`/view-employee/${id}`);
  }

  editEmployee(id) {
    this.props.history.push(`/add-employee/${id}`);
  }

  componentDidMount() {
    const token = localStorage.getItem("token"); // get token from local storage
    if (token) {
      this.setState({ token: token });
      EmployeeService.getEmployees(token).then((res) => {
        this.setState({ employees: res.data });
      });
    } else {
      // handle token not found error
      console.error("Token not found");
    }
  }

  addEmployee() {
    this.props.history.push("/add-employee/_add");
  }

  render() {
    return (
      <div>
        <h2 className="text-center text-success">Employees List</h2>
        <div className="row">
          <button className="btn btn-primary " onClick={this.addEmployee}>
            {" "}
            Add Employee
          </button>
        </div>
        <button
          style={{ marginLeft: "1300px" }}
          className="btn btn-danger fixed-top"
          onClick={this.handleLogout}
        >
          Logout
        </button>
        <br></br>
        <div className="row">
          <div className="scrollable-table-dark">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th s className="text-primary ">
                    First Name
                  </th>
                  <th className="text-primary"> Last Name</th>
                  <th className="text-primary"> Email Id</th>
                  <th className="text-primary">Mobile Number</th>
                  <th className="text-primary">Designation</th>
                  <th className="text-primary">Gender</th>
                  <th className="text-primary">Courses</th>
                  <th className="text-primary">Actions</th>
                </tr>
              </thead>

              <tbody>
                {this.state.employees.map((employee) => (
                  <tr key={employee.id}>
                    <td> {employee.firstName} </td>
                    <td> {employee.lastName}</td>
                    <td> {employee.emailId}</td>
                    <td> {employee.mobileNumber}</td>

                    <td> {employee.designation}</td>
                    <td> {employee.gender}</td>
                    <td>
                      {" "}
                      {employee.courses.map((course) => course).join(", ")}
                    </td>
                    <td>
                      <button
                        onClick={() => this.editEmployee(employee.id)}
                        className="btn btn-info"
                      >
                        Update{" "}
                      </button>
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => this.deleteEmployee(employee.id)}
                        className="btn btn-danger"
                      >
                        Delete{" "}
                      </button>
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => this.viewEmployee(employee.id)}
                        className="btn btn-info"
                      >
                        View{" "}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ListEmployeeComponent;
