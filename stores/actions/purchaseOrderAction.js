import axios from 'axios'
import { actionTypes } from '<action_types>'
import { setAuthHeader } from '<helpers>/utils'
const Module = `po`

export const FetchGroupsForPO = () => async dispatch => {
  try {
    dispatch({ type: actionTypes.PURCHASE_ORDER.FETCH_GROUP_STATUS, payload: { isFetching: true } })
    await axios
      .get(`/api/${Module}/groups`, setAuthHeader())
      .then(({ data }) => {
        dispatch({ type: actionTypes.PURCHASE_ORDER.FETCH_GROUP, payload: { data } })
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.PURCHASE_ORDER.FETCH_GROUP_STATUS, payload: { isFetching: false } })
  }
}

export const FetchSellersForPO = () => async dispatch => {
  try {
    dispatch({ type: actionTypes.PURCHASE_ORDER.FETCH_SELLER_STATUS, payload: { isFetching: true } })
    await axios
      .get(`/api/${Module}/sellers`, setAuthHeader())
      .then(({ data }) => {
        dispatch({ type: actionTypes.PURCHASE_ORDER.FETCH_SELLER, payload: { data } })
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.PURCHASE_ORDER.FETCH_SELLER_STATUS, payload: { isFetching: false } })
  }
}

export const FindItemForPO = itemCode => async dispatch => {
  try {
    dispatch({ type: actionTypes.PURCHASE_ORDER.FETCH_ITEM_STATUS, payload: { isFetching: true } })
    return await axios
      .get(`/api/${Module}/item/${itemCode}`, setAuthHeader())
      .then(({ data }) => {
        return data
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.PURCHASE_ORDER.FETCH_ITEM_STATUS, payload: { isFetching: false } })
  }
}

export const InsertPurchaseOrder = formValue => async dispatch => {
  try {
    dispatch({ type: actionTypes.PURCHASE_ORDER.FETCH_ITEM_STATUS, payload: { isFetching: true } })
    await axios
      .post(`/api/${Module}`, formValue, setAuthHeader())
      .then(({ data }) => {
        dispatch({ type: actionTypes.PURCHASE_ORDER.STORE_NEW, payload: data })
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.PURCHASE_ORDER.FETCH_ITEM_STATUS, payload: { isFetching: false } })
  }
}

export const ResetPurchaseOrderStore = () => dispatch => {
  try {
    dispatch({ type: actionTypes.PURCHASE_ORDER.STORE_RESET_PO })
  } catch (e) {
    return e
  }
}
