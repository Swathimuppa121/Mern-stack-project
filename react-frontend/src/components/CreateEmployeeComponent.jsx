import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class CreateEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      firstName: "",
      lastName: "",
      emailId: "",
      mobileNumber: "",
      designation: "",
      gender: "",
      courses: [],
      token: "", // added token state
      emailError: "", // email validation error state
      mobileError: "", // mobile validation error state
    };
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changeMobileNumberHandler = this.changeMobileNumberHandler.bind(this);
    this.changeDesignationHandler = this.changeDesignationHandler.bind(this);
    this.changeGenderHandler = this.changeGenderHandler.bind(this);
    this.changeCoursesHandler = this.changeCoursesHandler.bind(this);
    this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
  }

  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      const token = localStorage.getItem("token"); // get token from local storage
      if (token) {
        this.setState({ token: token });
        EmployeeService.getEmployeeById(this.state.id, token).then((res) => {
          let employee = res.data;
          this.setState({
            firstName: employee.firstName,
            lastName: employee.lastName,
            emailId: employee.emailId,
            mobileNumber: employee.mobileNumber,
            designation: employee.designation,
            gender: employee.gender,
            courses: employee.courses,
          });
        });
      } else {
        console.error("Token not found");
      }
    }
  }

  validateEmail(email) {
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailPattern.test(email)) {
      return "Please enter a valid Gmail address.";
    }
    return "";
  }

  validateMobileNumber(mobileNumber) {
    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobileNumber)) {
      return "Please enter a valid 10-digit mobile number.";
    }
    return "";
  }

  saveOrUpdateEmployee = (e) => {
    e.preventDefault();

    const emailError = this.validateEmail(this.state.emailId);
    const mobileError = this.validateMobileNumber(this.state.mobileNumber);

    if (emailError || mobileError) {
      this.setState({ emailError, mobileError });
      return;
    }

    let employee = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailId: this.state.emailId,
      mobileNumber: this.state.mobileNumber,
      designation: this.state.designation,
      gender: this.state.gender,
      courses: this.state.courses,
    };
    console.log("employee => " + JSON.stringify(employee));

    const token = localStorage.getItem("token"); // get token from local storage
    if (!token) {
      console.error("Token not found");
      return;
    }

    if (this.state.id === "_add") {
      EmployeeService.createEmployee(employee, token).then((res) => {
        this.props.history.push("/employees");
      });
    } else {
      EmployeeService.updateEmployee(employee, this.state.id, token).then(
        (res) => {
          this.props.history.push("/employees");
        }
      );
    }
  };

  changeFirstNameHandler = (event) => {
    this.setState({ firstName: event.target.value });
  };

  changeLastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };

  changeEmailHandler = (event) => {
    const emailId = event.target.value;
    const emailError = this.validateEmail(emailId);
    this.setState({ emailId, emailError });
  };

  changeMobileNumberHandler = (event) => {
    const mobileNumber = event.target.value;
    const mobileError = this.validateMobileNumber(mobileNumber);
    this.setState({ mobileNumber, mobileError });
  };

  changeDesignationHandler = (event) => {
    this.setState({ designation: event.target.value });
  };

  changeGenderHandler = (event) => {
    this.setState({ gender: event.target.value });
  };

  changeCoursesHandler = (event) => {
    let courses = this.state.courses;
    if (event.target.checked) {
      courses.push(event.target.value);
    } else {
      const index = courses.indexOf(event.target.value);
      if (index > -1) {
        courses.splice(index, 1);
      }
    }
    this.setState({ courses: courses });
  };

  cancel() {
    this.props.history.push("/employees");
  }

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center text-success">Add Employee</h3>;
    } else {
      return <h3 className="text-center text-success">Update Employee</h3>;
    }
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> First Name: </label>
                    <input
                      placeholder="First Name"
                      name="firstName"
                      className="form-control"
                      value={this.state.firstName}
                      onChange={this.changeFirstNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Last Name: </label>
                    <input
                      placeholder="Last Name"
                      name="lastName"
                      className="form-control"
                      value={this.state.lastName}
                      onChange={this.changeLastNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Email Id: </label>
                    <input
                      placeholder="Email Id"
                      name="emailId"
                      className="form-control"
                      value={this.state.emailId}
                      onChange={this.changeEmailHandler}
                    />
                    {this.state.emailError && (
                      <div className="text-danger">{this.state.emailError}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label> Mobile Number: </label>
                    <input
                      placeholder="Mobile Number"
                      name="mobileNumber"
                      className="form-control"
                      value={this.state.mobileNumber}
                      onChange={this.changeMobileNumberHandler}
                    />
                    {this.state.mobileError && (
                      <div className="text-danger">
                        {this.state.mobileError}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label> Designation: </label>
                    <select
                      name="designation"
                      className="form-control"
                      value={this.state.designation}
                      onChange={this.changeDesignationHandler}
                    >
                      <option value="">Select Designation</option>
                      <option value="HR">HR</option>
                      <option value="Manager">Manager</option>
                      <option value="Sales">Sales</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label> Gender: </label>
                    <div>
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        checked={this.state.gender === "Male"}
                        onChange={this.changeGenderHandler}
                      />
                      Male
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        checked={this.state.gender === "Female"}
                        onChange={this.changeGenderHandler}
                      />
                      Female
                    </div>
                  </div>

                  <div className="form-group">
                    <label> Courses: </label>
                    <div>
                      <input
                        type="checkbox"
                        name="courses"
                        value="MCA"
                        checked={this.state.courses.includes("MCA")}
                        onChange={this.changeCoursesHandler}
                      />
                      MCA
                      <input
                        type="checkbox"
                        name="courses"
                        value="MBA"
                        checked={this.state.courses.includes("MBA")}
                        onChange={this.changeCoursesHandler}
                      />
                      MBA
                      <input
                        type="checkbox"
                        name="courses"
                        value="MTECH"
                        checked={this.state.courses.includes("MTECH")}
                        onChange={this.changeCoursesHandler}
                      />
                      MTECH
                    </div>
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateEmployee}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateEmployeeComponent;
