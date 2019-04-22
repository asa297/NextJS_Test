const AuthMiddleware = require('../middlewares/AuthMiddleware')

module.exports = server => {
  server.get('/api/test', AuthMiddleware.VaidateToken, async (req, res) => {
    res.send('eee')
  })
}
