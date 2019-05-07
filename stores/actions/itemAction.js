import axios from 'axios'
import { actionTypes } from '../type'
import { setAuthHeader } from '<helpers>/utils'
const Module = `item`

export const FetchItem = (force = true) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.ITEM.FETCH_STATUS, payload: { isFetching: true } })

    const { items } = getState()
    if (items.List.length === 0 || force) {
      await axios
        .get(`/api/${Module}`, setAuthHeader())
        .then(({ data }) => {
          dispatch({ type: actionTypes.ITEM.FETCH_LIST, payload: { data } })
        })
        .catch(e => e)
    }
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.ITEM.FETCH_STATUS, payload: { isFetching: false } })
  }
}

//Check Data in store frist then Check Data in DB if don't have in store
export const GetItem = _id => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.ITEM.FETCH_STATUS, payload: { isFetching: true } })
    const { items } = getState()

    const item = items.List.find(v => v._id === _id)
    if (!item) await GetItemById(_id)(dispatch)
    else dispatch({ type: actionTypes.ITEM.FETCH, payload: { data: item } })
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.ITEM.FETCH_STATUS, payload: { isFetching: false } })
  }
}

export const GetItemById = _id => async dispatch => {
  try {
    dispatch({ type: actionTypes.ITEM.FETCH_STATUS, payload: { isFetching: true } })
    await axios
      .get(`/api/${Module}/${_id}`, setAuthHeader())
      .then(({ data }) => {
        dispatch({ type: actionTypes.ITEM.FETCH, payload: { data } })
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.ITEM.FETCH_STATUS, payload: { isFetching: false } })
  }
}

export const InsertItem = formValue => async dispatch => {
  try {
    dispatch({ type: actionTypes.ITEM.FETCH_STATUS, payload: { isFetching: true } })
    await axios
      .post(`/api/${Module}`, formValue, setAuthHeader())
      .then(({}) => {
        dispatch({ type: actionTypes.ITEM.STORE_NEW, payload: formValue })
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.ITEM.FETCH_STATUS, payload: { isFetching: false } })
  }
}

export const DeleteItem = _id => async dispatch => {
  try {
    dispatch({ type: actionTypes.ITEM.FETCH_STATUS, payload: { isFetching: true } })
    await axios
      .delete(`/api/${Module}/${_id}`, setAuthHeader())
      .then(({}) => {
        dispatch({ type: actionTypes.ITEM.STORE_DELETE, payload: { _id } })
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.ITEM.FETCH_STATUS, payload: { isFetching: false } })
  }
}

export const UpdateItem = formValue => async dispatch => {
  try {
    dispatch({ type: actionTypes.ITEM.FETCH_STATUS, payload: { isFetching: true } })
    await axios
      .put(`/api/${Module}/${formValue._id}`, formValue, setAuthHeader())
      .then(({}) => {
        dispatch({ type: actionTypes.ITEM.STORE_UPDATE, payload: formValue })
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.ITEM.FETCH_STATUS, payload: { isFetching: false } })
  }
}
