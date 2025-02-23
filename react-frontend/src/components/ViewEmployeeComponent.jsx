import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class ViewEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      employee: {},
      token: localStorage.getItem("token"), // retrieve token from local storage
    };
  }

  componentDidMount() {
    EmployeeService.getEmployeeById(this.state.id, this.state.token).then(
      (res) => {
        this.setState({ employee: res.data });
      }
    );
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center text-success"> View Employee Details</h3>
          <div className="card-body">
            <div className="row">
              <label> Employee ID: </label>
              <div> {this.state.employee.id}</div>
            </div>
            <div className="row">
              <label> Employee First Name: </label>
              <div> {this.state.employee.firstName}</div>
            </div>
            <div className="row">
              <label> Employee Last Name: </label>
              <div> {this.state.employee.lastName}</div>
            </div>
            <div className="row">
              <label> Employee Email ID: </label>
              <div> {this.state.employee.emailId}</div>
            </div>
            <div className="row">
              <label> Employee Mobile Number: </label>
              <div> {this.state.employee.mobileNumber || "N/A"}</div>
            </div>
            <div className="row">
              <label> Employee Designation: </label>
              <div> {this.state.employee.designation}</div>
            </div>
            <div className="row">
              <label> Employee Gender: </label>
              <div> {this.state.employee.gender}</div>
            </div>
            <div className="row">
              <label> Employee Courses: </label>
              <div>
                {" "}
                {this.state.employee.courses &&
                  this.state.employee.courses.join(", ")}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewEmployeeComponent;
