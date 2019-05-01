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
    console.log(e)
    return e
  } finally {
    dispatch({ type: actionTypes.ORGANIZATION.FETCH_STATUS, payload: { isFetching: false } })
  }
}

export const GetOrganization = _id => (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.ORGANIZATION.FETCH_STATUS, payload: { isFetching: true } })
    const { organizations } = getState()
    const organization = organizations.List.find(v => v._id === _id)
    dispatch({ type: actionTypes.ORGANIZATION.FETCH, payload: { data: organization ? organization : {} } })
  } catch (e) {
    console.log(e)
    return e
  } finally {
    dispatch({ type: actionTypes.ORGANIZATION.FETCH_STATUS, payload: { isFetching: false } })
  }
}
