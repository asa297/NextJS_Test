import axios from 'axios'
import Cookies from 'js-cookie'
import { actionTypes } from '../type'

import { getCookieFromReq } from '<helpers>/utils'

const setAuthHeader = req => {
  const token = req ? getCookieFromReq(req, 'jwt') : Cookies.getJSON('jwt')
  if (token) return { headers: { authorization: `Bearer ${token}` } }
  return undefined
}

export const FetchOrganization = () => async dispatch => {
  try {
    dispatch({ type: actionTypes.ORGANIZATION.FETCH_STATUS, payload: { isFetching: true } })
    await axios
      .get('/api/org', setAuthHeader())
      .then(({ data }) => dispatch({ type: actionTypes.ORGANIZATION.FETCH, payload: { data } }))
      .catch(e => e)
  } catch (e) {
    console.log(e)
    return e
  } finally {
    dispatch({ type: actionTypes.ORGANIZATION.FETCH_STATUS, payload: { isFetching: false } })
  }
}
