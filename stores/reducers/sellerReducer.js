import { actionTypes } from '<action_types>'

const initState = {
  List: [],
  Item: {},
  isFetching: false,
  HasMore: false,
}

export default function(state = initState, action) {
  switch (action.type) {
    case actionTypes.SELLER.FETCH:
      return Object.assign({}, state, {
        Item: { ...action.payload.data },
      })
    case actionTypes.SELLER.FETCH_LIST:
      return Object.assign({}, state, {
        List: [...action.payload.data],
      })
    case actionTypes.SELLER.STORE_NEW:
      return Object.assign({}, state, {
        List: [...state.List, ...action.payload],
      })
    case actionTypes.SELLER.STORE_DELETE:
      return Object.assign({}, state, {
        List: [...state.List.filter(v => v._id !== action.payload._id)],
      })
    case actionTypes.SELLER.STORE_UPDATE:
      const indexUpdated = state.List.findIndex(v => v._id === action.payload._id)
      if (!indexUpdated) state.List[indexUpdated] = { ...action.payload }
      return state
    case actionTypes.SELLER.FETCH_STATUS:
      return Object.assign({}, state, {
        isFetching: action.payload.isFetching,
      })
    default:
      return state
  }
}
