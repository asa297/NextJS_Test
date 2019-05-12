const { ValidateToken, ValidateRole } = require('../../middlewares/AuthMiddleware')
const { admin, accountant } = require('../../helpers/role')
const mongoose = require('mongoose')
const sellerModel = mongoose.model('sellers')
const gruopsModel = mongoose.model('groups')

module.exports = server => {
  server.get('/api/po/sellers', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const result = await sellerModel.find({})
    res.send(result)
  })

  server.get('/api/po/groups', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const result = await gruopsModel.findById(id)
    res.send(result)
  })
}
