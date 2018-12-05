import axios from "axios";
import { actionTypes } from "../type";

export const fetchUser = () => async dispatch => {
  const res = await axios
    .get("/api/test1")
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
  dispatch({ type: actionTypes.FETCH_USER, payload: res.data });
};
