import axios from "axios";
import { actionTypes } from "../type";
import { setToken, getToken } from "../../utils/AuthService";

const root = `/api`;

export const FetchUser = () => async dispatch => {
  var headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`
  };

  const res = await axios
    .get(`${root}/auth/me`, { headers })
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });

  dispatch({ type: actionTypes.FETCH_USER, payload: res.data });
};

export const Login = data => async dispatch => {
  const res = await axios
    .post(`${root}/auth/login`, data)
    .then(response => {
      setToken(response.data.token);
      return response;
    })
    .catch(error => {
      return error;
    });

  dispatch({ type: actionTypes.FETCH_USER, payload: res.data });
};
