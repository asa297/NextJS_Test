const { ValidateToken, ValidateRole } = require('../../middlewares/AuthMiddleware')
const { admin, accountant } = require('../../helpers/role')
const mongoose = require('mongoose')
const purchaseOrderModel = mongoose.model('poes')

module.exports = server => {
  server.get('/api/report/po', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const result = await purchaseOrderModel.find({})
    res.send(result)
  })
}
