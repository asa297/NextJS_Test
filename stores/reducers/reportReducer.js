import { actionTypes } from '<action_types>'

const initState = {
  purchaseOrder: [],
  isFetching: false,
}

export default function(state = initState, action) {
  switch (action.type) {
    case actionTypes.REPORT.FETCH_PURCASE_ORDER:
      return Object.assign({}, state, {
        purchaseOrder: [...action.payload.data],
      })
    case actionTypes.REPORT.FETCH_STATUS:
      return Object.assign({}, state, {
        isFetching: action.payload.isFetching,
      })
    default:
      return state
  }
}
