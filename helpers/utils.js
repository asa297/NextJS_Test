import { Routing } from '<static>/data/routing.json'
import Cookies from 'js-cookie'

export const getCookieFromReq = (req, cookieKey) => {
  const cookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${cookieKey}=`))
  if (!cookie) return undefined
  return cookie.split('=')[1]
}

export const getPageNameFromReq = ctx => {
  return Routing.find(v => v.path === ctx.pathname)
}

export const setAuthHeader = req => {
  const token = req ? getCookieFromReq(req, 'jwt') : Cookies.getJSON('jwt')
  if (token) return { headers: { authorization: `Bearer ${token}` } }
  return undefined
}

export const getBase64Image = (img, callback) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
