import axios from 'axios'
import { actionTypes } from '../type'
import { setAuthHeader } from '<helpers>/utils'
const Module = `po`

export const FetchSellerForPO = force => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.PURCHASE_ORDER.FETCH_STATUS, payload: { isFetching: true } })

    const { sellers } = getState()
    if (sellers.List.length === 0 || force) {
      await axios
        .get(`/api/${Module}/sellers`, setAuthHeader())
        .then(({ data }) => {
          dispatch({ type: actionTypes.PURCHASE_ORDER.FETCH_LIST, payload: { data } })
        })
        .catch(e => e)
    }
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.PURCHASE_ORDER.FETCH_STATUS, payload: { isFetching: false } })
  }
}
