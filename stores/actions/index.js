import axios from "axios";
import { actionTypes } from "../type";

const root = `/api`;
export const FetchUser = () => async dispatch => {
  const res = await axios
    .get(`${root}/auth/me`)
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
      return response;
    })
    .catch(error => {
      return error;
    });
  dispatch({ type: actionTypes.FETCH_USER, payload: res.data });
};
