const { ValidateToken, ValidateRole } = require('../../middlewares/AuthMiddleware')
const { admin, accountant } = require('../../helpers/role')
const mongoose = require('mongoose')
const groupModel = mongoose.model('groups')

module.exports = server => {
  server.get('/api/group', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const result = await groupModel.find({})
    res.send(result)
  })

  server.get('/api/group/:id', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const { id } = req.params
    if (!id) res.status(403).send({ message: 'Need Parameter' })

    const result = await groupModel.findById(id)
    res.send(result)
  })

  server.post('/api/group', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const { orgType, orgName, orgComA, orgComB, orgCode } = req.body
    const user = req.user
    const found = await groupModel.findOne({ orgCode })
    if (found) return res.status(403).send({ message: 'Organization Code is Duplicate.' })

    await groupModel({
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

  server.delete('/api/group/:id', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const { id } = req.params
    if (!id) res.status(403).send({ message: 'Need Parameter' })
    await groupModel.findByIdAndDelete(id)
    res.send({ message: 'Organization is already deleted.' })
  })

  server.put('/api/group/:id', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const { id } = req.params
    const { orgType, orgName, orgComA, orgComB, orgCode } = req.body
    const user = req.user

    if (!id) res.status(403).send({ message: 'Need Parameter' })

    await groupModel
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
