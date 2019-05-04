import axios from 'axios'
import { actionTypes } from '../type'
import { setAuthHeader } from '<helpers>/utils'

export const FetchOrganization = () => async dispatch => {
  try {
    dispatch({ type: actionTypes.ORGANIZATION.FETCH_STATUS, payload: { isFetching: true } })
    await axios
      .get('/api/org', setAuthHeader())
      .then(({ data }) => {
        dispatch({ type: actionTypes.ORGANIZATION.FETCH_LIST, payload: { data } })
      })
      .catch(e => e)
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
      .get(`/api/org/${_id}`, setAuthHeader())
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
      .post('/api/org', formValue, setAuthHeader())
      .then(({}) => {
        dispatch({ type: actionTypes.ORGANIZATION.STORE, payload: formValue })
      })
      .catch(e => e)
  } catch (e) {
    return e
  } finally {
    dispatch({ type: actionTypes.ORGANIZATION.FETCH_STATUS, payload: { isFetching: false } })
  }
}
