import auth0 from 'auth0-js'
import Cookies from 'js-cookie'

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: 'giornie.auth0.com',
      clientID: '532OnoYJvTinougDXuh7QA3uKyUQw8iX',
      redirectUri: 'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid profile',
    })

    this.login = this.login.bind(this)
    this.handleAuthentication = this.handleAuthentication.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  login() {
    this.auth0.authorize()
  }

  handleAuthentication() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult)
          resolve()
        } else if (err) {
          console.log(err)
          reject()
        }
      })
    })
  }

  setSession(authResult) {
    const expiresAt = authResult.expiresIn * 1000 + new Date().getTime()

    Cookies.set('user', authResult.idTokenPayload)
    Cookies.set('jwt', authResult.idToken)
    Cookies.set('expireAt', expiresAt)
  }

  logout() {
    Cookies.remove('user')
    Cookies.remove('jwt')
    Cookies.remove('expireAt')

    this.auth0.logout({
      returnTo: '',
      clientID: '532OnoYJvTinougDXuh7QA3uKyUQw8iX',
    })
  }

  isAuthenticated() {
    const expiresAt = Cookies.getJSON('expireAt')
    return new Date().getTime() < expiresAt
  }
}

const auth0Client = new Auth()

export default auth0Client
