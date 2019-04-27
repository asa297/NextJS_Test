import { Routing } from '<static>/data/routing.json'

export const getCookieFromReq = (req, cookieKey) => {
  const cookie = req.headers.cookie.split(';').find(c => c.trim().startsWith(`${cookieKey}=`))

  if (!cookie) {
    return undefined
  }

  return cookie.split('=')[1]
}

export const getPageNameFromReq = req => {
  const currentPath = req ? req.url : window.location.pathname
  return Routing.find(v => v.path === currentPath)
}
