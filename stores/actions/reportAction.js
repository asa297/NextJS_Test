import axios from 'axios'
import { actionTypes } from '<action_types>'
import { setAuthHeader } from '<helpers>/utils'
const Module = `report`

export const FetchPurchaseOrder = () => async dispatch => {
  try {
    dispatch({ type: actionTypes.REPORT.FETCH_STATUS, payload: { isFetching: true } })
    await axios
      .get(`/api/${Module}/po`, setAuthHeader())
      .then(({ data }) => {
        dispatch({ type: actionTypes.REPORT.FETCH_PURCASE_ORDER, payload: { data } })
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.REPORT.FETCH_STATUS, payload: { isFetching: false } })
  }
}
