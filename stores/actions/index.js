import axios from 'axios'
import Cookies from 'js-cookie'
import { actionTypes } from '../type'

const setAuthHeader = req => {
  const token = req ? getCookieFromReq(req, 'jwt') : Cookies.getJSON('jwt')

  if (token) {
    return { headers: { authorization: `Bearer ${token}` } }
  }

  return undefined
}

export const GetAllItem = () => async dispatch => {
  const res = await axios.get('/api/item/list').catch(e => null)
}
