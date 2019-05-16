const { ValidateToken, ValidateRole } = require('../../middlewares/AuthMiddleware')
const { admin, accountant } = require('../../helpers/role')
const mongoose = require('mongoose')
const sellerModel = mongoose.model('sellers')
const gruopModel = mongoose.model('groups')
const itemModel = mongoose.model('items')

module.exports = server => {
  server.get('/api/po/groups', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const result = await gruopModel.find({}, { groupCode: 1, groupStickerNumber: 1, guideName: 1 })
    res.send(result)
  })

  server.get('/api/po/sellers', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const result = await sellerModel.find({}, { sellerName: 1, sellerCode: 1 })
    res.send(result)
  })

  server.get('/api/po/item/:itemCode', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const { itemCode } = req.params
    const result = await itemModel.findOne({ itemCode }, { itemCode: 1, itemName: 1, itemPrice: 1, itemQty_Shop1: 1, itemTypeId: 1, itemTypeName: 1 })
    res.send(result)
  })

  server.post('/api/po', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    // const { orgType, orgName, orgComA, orgComB, orgCode } = req.body
    // const { user } = req
    // const found = await organizationModel.findOne({ orgCode })
    // if (found) return res.status(403).send({ message: 'Organization Code is Duplicate.' })

    // await organizationModel({
    //   orgTypeId: orgType.id,
    //   orgTypeName: orgType.label,
    //   orgName,
    //   orgComA,
    //   orgComB,
    //   orgCode,
    //   RecordIdBy: user.name,
    //   RecordNameBy: user.nickname,
    //   RecordDate: Date.now(),
    //   LastModifyById: user.name,
    //   LastModifyByName: user.nickname,
    //   LastModifyDate: Date.now(),
    // }).save()

    res.send({ message: 'Organization is already inserted.' })
  })
}
