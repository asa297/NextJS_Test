const { ValidateToken, ValidateRole } = require('../../middlewares/AuthMiddleware')
const { admin, accountant } = require('../../helpers/role')
const mongoose = require('mongoose')
const organizationModel = mongoose.model('organizations')

module.exports = server => {
  server.get('/api/org', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const result = await organizationModel.find({})
    res.send(result)
  })

  server.post('/api/org', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const { orgType, orgName, orgComA, orgComB, orgCode } = req.body
    const user = req.user

    const found = await organizationModel.findOne({ orgCode })
    if (found) return res.status(403).send({ message: 'Organization Code is Duplicate.' })

    await organizationModel({
      orgTypeId: orgType.org_typeId,
      orgTypeName: orgType.org_typeName,
      orgName,
      orgComA,
      orgComB,
      orgCode,
      RecordIdBy: user.name,
      RecordNameBy: user.nickname,
      RecordDate: Date.now(),
      LastModifyById: user.name,
      LastModifyByName: user.nickname,
      LastModifyDate: Date.now(),
    }).save()

    res.send({ message: 'Organization is already inserted.' })
  })
}
