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

//Check Data in store frist then Check Data in DB if don't have in store
export const GetGroup = _id => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.GROUP.FETCH_STATUS, payload: { isFetching: true } })
    const { organizations: groups } = getState()

    const group = groups.List.find(v => v._id === _id)
    if (!group) await GetGroupById(_id)(dispatch)
    else dispatch({ type: actionTypes.GROUP.FETCH, payload: { data: group } })
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.GROUP.FETCH_STATUS, payload: { isFetching: false } })
  }
}

export const GetGroupById = _id => async dispatch => {
  try {
    dispatch({ type: actionTypes.GROUP.FETCH_STATUS, payload: { isFetching: true } })
    await axios
      .get(`/api/${Module}/${_id}`, setAuthHeader())
      .then(({ data }) => {
        dispatch({ type: actionTypes.GROUP.FETCH, payload: { data } })
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.GROUP.FETCH_STATUS, payload: { isFetching: false } })
  }
}

export const InsertGroup = formValue => async dispatch => {
  try {
    dispatch({ type: actionTypes.GROUP.FETCH_STATUS, payload: { isFetching: true } })
    await axios
      .post(`/api/${Module}`, formValue, setAuthHeader())
      .then(({}) => {
        dispatch({ type: actionTypes.GROUP.STORE_NEW, payload: formValue })
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.GROUP.FETCH_STATUS, payload: { isFetching: false } })
  }
}

export const DeleteGroup = _id => async dispatch => {
  try {
    dispatch({ type: actionTypes.GROUP.FETCH_STATUS, payload: { isFetching: true } })
    await axios
      .delete(`/api/${Module}/${_id}`, setAuthHeader())
      .then(({}) => {
        dispatch({ type: actionTypes.GROUP.STORE_DELETE, payload: { _id } })
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.GROUP.FETCH_STATUS, payload: { isFetching: false } })
  }
}

export const UpdateGroup = formValue => async dispatch => {
  try {
    dispatch({ type: actionTypes.GROUP.FETCH_STATUS, payload: { isFetching: true } })
    await axios
      .put(`/api/${Module}/${formValue._id}`, formValue, setAuthHeader())
      .then(({}) => {
        dispatch({ type: actionTypes.GROUP.STORE_UPDATE, payload: formValue })
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.GROUP.FETCH_STATUS, payload: { isFetching: false } })
  }
}
