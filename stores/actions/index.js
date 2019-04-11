import axios from "axios";
import { actionTypes } from "../type";

export const GetAllItem = () => async dispatch => {
  const res = await axios.get("/api/item/list").catch(e => null);
  if (!res) return { status: false };
  const { data } = res;
  dispatch({ type: actionTypes.FETCH_USER, payload: data });
  return { status: res.status === 200 };
};

export const AuJa = () => dispatch => {
  console.log("au");
};
