import axios from 'axios'
import { actionTypes } from '../type'
import { setAuthHeader } from '<helpers>/utils'
const Module = `org`

export const FetchOrganization = (force = true) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.ORGANIZATION.FETCH_STATUS, payload: { isFetching: true } })

    const { organizations } = getState()
    if (organizations.List.length === 0 || force) {
      await axios
        .get(`/api/${Module}`, setAuthHeader())
        .then(({ data }) => {
          dispatch({ type: actionTypes.ORGANIZATION.FETCH_LIST, payload: { data } })
        })
        .catch(e => e)
    }
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.ORGANIZATION.FETCH_STATUS, payload: { isFetching: false } })
  }
}

//Check Data in store frist then Check Data in DB if don't have in store
export const GetOrganization = _id => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.ORGANIZATION.FETCH_STATUS, payload: { isFetching: true } })
    const { organizations } = getState()

    const organization = organizations.List.find(v => v._id === _id)
    if (!organization) await GetOrganizationById(_id)(dispatch)
    else dispatch({ type: actionTypes.ORGANIZATION.FETCH, payload: { data: organization } })
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.ORGANIZATION.FETCH_STATUS, payload: { isFetching: false } })
  }
}

export const GetOrganizationById = _id => async dispatch => {
  try {
    dispatch({ type: actionTypes.ORGANIZATION.FETCH_STATUS, payload: { isFetching: true } })
    await axios
      .get(`/api/${Module}/${_id}`, setAuthHeader())
      .then(({ data }) => {
        dispatch({ type: actionTypes.ORGANIZATION.FETCH, payload: { data } })
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.ORGANIZATION.FETCH_STATUS, payload: { isFetching: false } })
  }
}

export const InsertOrganization = formValue => async dispatch => {
  try {
    dispatch({ type: actionTypes.ORGANIZATION.FETCH_STATUS, payload: { isFetching: true } })
    await axios
      .post(`/api/${Module}`, formValue, setAuthHeader())
      .then(({}) => {
        dispatch({ type: actionTypes.ORGANIZATION.STORE_NEW, payload: formValue })
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.ORGANIZATION.FETCH_STATUS, payload: { isFetching: false } })
  }
}

export const DeleteOrganization = _id => async dispatch => {
  try {
    dispatch({ type: actionTypes.ORGANIZATION.FETCH_STATUS, payload: { isFetching: true } })
    await axios
      .delete(`/api/${Module}/${_id}`, setAuthHeader())
      .then(({}) => {
        dispatch({ type: actionTypes.ORGANIZATION.STORE_DELETE, payload: { _id } })
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.ORGANIZATION.FETCH_STATUS, payload: { isFetching: false } })
  }
}

export const UpdateOrganization = formValue => async dispatch => {
  try {
    dispatch({ type: actionTypes.ORGANIZATION.FETCH_STATUS, payload: { isFetching: true } })
    await axios
      .put(`/api/${Module}/${formValue._id}`, formValue, setAuthHeader())
      .then(({}) => {
        dispatch({ type: actionTypes.ORGANIZATION.STORE_UPDATE, payload: formValue })
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.ORGANIZATION.FETCH_STATUS, payload: { isFetching: false } })
  }
}
