const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

const NAMESPACE = process.env.NAMESPACE

exports.ValidateToken = jwt({
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

exports.ValidateRole = role => (req, res, next) => {
  const { user } = req
  if (user && user[NAMESPACE + '/role'] && role.find(value => value === user[NAMESPACE + '/role'])) {
    next()
  } else {
    return res.status(401).send({ title: 'Not Authorized', detail: 'You are not authorized to access this data' })
  }
}
