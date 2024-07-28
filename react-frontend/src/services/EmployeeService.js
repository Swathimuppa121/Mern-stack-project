import axios from "axios";

const EMPLOYEE_API_BASE_URL = "http://localhost:7002/api/v1/";

class EmployeeService {
  login(customer) {
    return axios.post(EMPLOYEE_API_BASE_URL + "login", customer);
  }

  getEmployees(token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get(EMPLOYEE_API_BASE_URL + "employees", { headers });
  }

  createEmployee(employee, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.post(EMPLOYEE_API_BASE_URL + "employees", employee, {
      headers,
    });
  }

  getEmployeeById(employeeId, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.get(EMPLOYEE_API_BASE_URL + "employees/" + employeeId, {
      headers,
    });
  }

  updateEmployee(employee, employeeId, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.put(
      EMPLOYEE_API_BASE_URL + "employees/" + employeeId,
      employee,
      { headers }
    );
  }

  deleteEmployee(employeeId, token) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return axios.delete(EMPLOYEE_API_BASE_URL + "employees/" + employeeId, {
      headers,
    });
  }
}

export default new EmployeeService();
