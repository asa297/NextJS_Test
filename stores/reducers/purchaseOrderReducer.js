import { actionTypes } from '<action_types>'

const initState = {
  item: {},
  sellers: [],
  groups: [],
  isGroupsFetching: false,
  isSellersFetching: false,
  isItemFetching: false,
}

export default function(state = initState, action) {
  switch (action.type) {
    case actionTypes.PURCHASE_ORDER.FETCH_SELLER:
      return Object.assign({}, state, {
        sellers: [...action.payload.data],
      })
    case actionTypes.PURCHASE_ORDER.FETCH_GROUP:
      return Object.assign({}, state, {
        groups: [...action.payload.data],
      })

    case actionTypes.PURCHASE_ORDER.STORE_NEW:
      return Object.assign({}, state, {
        item: { ...action.payload.data },
      })

    case actionTypes.PURCHASE_ORDER.FETCH_SELLER_STATUS:
      return Object.assign({}, state, {
        isSellersFetching: action.payload.isFetching,
      })
    case actionTypes.PURCHASE_ORDER.FETCH_GROUP_STATUS:
      return Object.assign({}, state, {
        isGroupsFetching: action.payload.isFetching,
      })
    case actionTypes.PURCHASE_ORDER.FETCH_ITEM_STATUS:
      return Object.assign({}, state, {
        isItemFetching: action.payload.isFetching,
      })

    case actionTypes.PURCHASE_ORDER.STORE_RESET_PO:
      return Object.assign({}, state, {
        item: {},
      })
    default:
      return state
  }
}
