const { ValidateToken, ValidateRole } = require('../../middlewares/AuthMiddleware')
const { admin, accountant } = require('../../helpers/role')
const mongoose = require('mongoose')
const organizationModel = mongoose.model('organizations')

module.exports = server => {
  server.get('/api/org', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const result = await organizationModel.find({})
    res.send(result)
  })

  server.get('/api/org/:id', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const { id } = req.params
    if (!id) res.status(403).send({ message: 'Need Parameter' })

    const result = await organizationModel.findById(id)
    res.send(result)
  })

  server.post('/api/org', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const { orgType, orgName, orgComA, orgComB, orgCode } = req.body
    const user = req.user
    const found = await organizationModel.findOne({ orgCode })
    if (found) return res.status(403).send({ message: 'Organization Code is Duplicate.' })

    await organizationModel({
      orgTypeId: orgType.id,
      orgTypeName: orgType.label,
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

  server.delete('/api/org/:id', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const { id } = req.params
    if (!id) res.status(403).send({ message: 'Need Parameter' })
    await organizationModel.findByIdAndDelete(id)
    res.send({ message: 'Organization is already deleted.' })
  })

  server.put('/api/org/:id', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const { id } = req.params
    const { orgType, orgName, orgComA, orgComB, orgCode } = req.body
    const user = req.user

    if (!id) res.status(403).send({ message: 'Need Parameter' })
    const found = await organizationModel.findById(id)
    if (!found) res.status(403).send({ message: 'Organization is not found.' })

    await organizationModel
      .updateOne(
        { _id: id },
        {
          $set: {
            orgTypeId: orgType.id,
            orgTypeName: orgType.label,
            orgName,
            orgComA,
            orgComB,
            orgCode,
            LastModifyById: user.name,
            LastModifyByName: user.nickname,
            LastModifyDate: Date.now(),
          },
        },
      )
      .exec()

    res.send({ message: 'Organization is already updated.' })
  })
}
