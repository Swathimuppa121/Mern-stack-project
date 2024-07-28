// axiosConfig.js
import axios from "axios";
const getToken = () => {
  return localStorage.getItem("token");
};

const updateToken = (token) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
};

export { updateToken, getToken };
export default axios;
