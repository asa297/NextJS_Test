const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

exports.VaidateToken = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 50,
    jwksUri: process.env.JWKS_URL,
  }),
  audience: process.env.AUTH0_CLIENT_ID,
  issuer: process.env.AUTH0_DOMAIN,
  algorithms: ['RS256'],
})
