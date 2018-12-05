import axios from "axios";

import { FETCH_USER } from "../store";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/test1");

  dispatch({ type: FETCH_USER, payload: res.data });
};
