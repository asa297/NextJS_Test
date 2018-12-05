import { actionTypes } from "../type";

export default function(state = null, action) {
  switch (action.type) {
    case actionTypes.FETCH_USER:
      return action.payload ? action.payload : false;
    default:
      return state;
  }
}
