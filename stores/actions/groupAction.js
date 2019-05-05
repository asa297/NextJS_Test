import axios from 'axios'
import { actionTypes } from '../type'
import { setAuthHeader } from '<helpers>/utils'
const Module = `group`

export const FetchGroup = () => async dispatch => {
  try {
    dispatch({ type: actionTypes.GROUP.FETCH_STATUS, payload: { isFetching: true } })
    await axios
      .get(`/api/${Module}`, setAuthHeader())
      .then(({ data }) => {
        dispatch({ type: actionTypes.GROUP.FETCH_LIST, payload: { data } })
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.GROUP.FETCH_STATUS, payload: { isFetching: false } })
  }
}
