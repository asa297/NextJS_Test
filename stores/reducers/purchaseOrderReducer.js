import { actionTypes } from '../type'

const initState = {
  sellers: [],
  groups: [],
  isFetching: false,
}

export default function(state = initState, action) {
  switch (action.type) {
    case actionTypes.PURCHASE_ORDER.FETCH_SELLER:
      return Object.assign({}, state, {
        Item: { ...action.payload.data },
      })

    case actionTypes.PURCHASE_ORDER.FETCH_STATUS:
      return Object.assign({}, state, {
        isFetching: action.payload.isFetching,
      })
    default:
      return state
  }
}
