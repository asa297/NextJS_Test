const { ValidateToken, ValidateRole } = require('../../middlewares/AuthMiddleware')
const { admin, accountant } = require('../../helpers/role')
const mongoose = require('mongoose')
const organizationModel = mongoose.model('organizations')

module.exports = server => {
  server.get('/api/org', ValidateToken, ValidateRole([admin]), async (req, res) => {
    const result = await organizationModel.find({})
    res.send(result)
  })
}
