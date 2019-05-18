import axios from 'axios'
import { actionTypes } from '<action_types>'
import { setAuthHeader } from '<helpers>/utils'
const Module = `seller`

export const FetchSeller = (force = true) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.SELLER.FETCH_STATUS, payload: { isFetching: true } })

    const { sellers } = getState()
    if (sellers.List.length === 0 || force) {
      await axios
        .get(`/api/${Module}`, setAuthHeader())
        .then(({ data }) => {
          dispatch({ type: actionTypes.SELLER.FETCH_LIST, payload: { data } })
        })
        .catch(e => e)
    }
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.SELLER.FETCH_STATUS, payload: { isFetching: false } })
  }
}

//Check Data in store frist then Check Data in DB if don't have in store
export const GetSeller = _id => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.SELLER.FETCH_STATUS, payload: { isFetching: true } })
    const { sellers } = getState()

    const seller = sellers.List.find(v => v._id === _id)
    if (!seller) await GetSellerById(_id)(dispatch)
    else dispatch({ type: actionTypes.SELLER.FETCH, payload: { data: seller } })
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.SELLER.FETCH_STATUS, payload: { isFetching: false } })
  }
}

export const GetSellerById = _id => async dispatch => {
  try {
    dispatch({ type: actionTypes.SELLER.FETCH_STATUS, payload: { isFetching: true } })
    await axios
      .get(`/api/${Module}/${_id}`, setAuthHeader())
      .then(({ data }) => {
        dispatch({ type: actionTypes.SELLER.FETCH, payload: { data } })
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.SELLER.FETCH_STATUS, payload: { isFetching: false } })
  }
}

export const InsertSeller = formValue => async dispatch => {
  try {
    dispatch({ type: actionTypes.SELLER.FETCH_STATUS, payload: { isFetching: true } })
    await axios
      .post(`/api/${Module}`, formValue, setAuthHeader())
      .then(({}) => {
        dispatch({ type: actionTypes.SELLER.STORE_NEW, payload: formValue })
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.SELLER.FETCH_STATUS, payload: { isFetching: false } })
  }
}

export const DeleteSeller = _id => async dispatch => {
  try {
    dispatch({ type: actionTypes.SELLER.FETCH_STATUS, payload: { isFetching: true } })
    await axios
      .delete(`/api/${Module}/${_id}`, setAuthHeader())
      .then(({}) => {
        dispatch({ type: actionTypes.SELLER.STORE_DELETE, payload: { _id } })
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.SELLER.FETCH_STATUS, payload: { isFetching: false } })
  }
}

export const UpdateSeller = formValue => async dispatch => {
  try {
    dispatch({ type: actionTypes.SELLER.FETCH_STATUS, payload: { isFetching: true } })
    await axios
      .put(`/api/${Module}/${formValue._id}`, formValue, setAuthHeader())
      .then(({}) => {
        dispatch({ type: actionTypes.SELLER.STORE_UPDATE, payload: formValue })
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.SELLER.FETCH_STATUS, payload: { isFetching: false } })
  }
}
