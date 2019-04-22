const { ValidateToken, ValidateRole } = require('../middlewares/AuthMiddleware')
const { admin } = require('../helpers/role')

module.exports = server => {
  server.get('/api/test', ValidateToken, ValidateRole([admin]), async (req, res) => {
    res.send('eee')
  })
}
