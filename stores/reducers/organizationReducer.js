import { actionTypes } from '../type'

const initState = {
  List: [],
  Item: {},
  isFetching: false,
  HasMore: false,
}

export default function(state = initState, action) {
  switch (action.type) {
    case actionTypes.ORGANIZATION.FETCH:
      return Object.assign({}, state, {
        Item: { ...action.payload.data },
      })
    case actionTypes.ORGANIZATION.FETCH_LIST:
      return Object.assign({}, state, {
        List: [...action.payload.data],
      })
    case actionTypes.ORGANIZATION.STORE_NEW:
      return Object.assign({}, state, {
        List: [...state.List, ...action.payload.data],
      })
    case actionTypes.ORGANIZATION.FETCH_STATUS:
      return Object.assign({}, state, {
        isFetching: action.payload.isFetching,
      })
    default:
      return state
  }
}
