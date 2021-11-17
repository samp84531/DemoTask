import axios from 'axios';
import { SERVICE_URL } from '../configs/serverApis';
import { store } from '../../App'
import { logoutUser } from '../redux/actions/LoginAction'

axios.defaults.baseURL = SERVICE_URL;
axios.defaults.headers = {'Content-Type': 'application/json'};
axios.interceptors.request.use(
  async (request) => {
    if (request) return request;
  },
  (error) => {
    return Promise.reject(error)
  }
);
axios.interceptors.response.use(
  async (response) => {
    if (response) return response;
  },
  (error) => {
    if (error.response && error.response.status && error.response.status === 403) {
      if (error.response.data && error.response.data.error && error.response.data.error == "The token has been blacklisted") {
        store.dispatch(logoutUser())
      }
    }
    return Promise.reject(error)
  }
);

export default axios;