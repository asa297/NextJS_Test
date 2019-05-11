const { ValidateToken, ValidateRole } = require('../../middlewares/AuthMiddleware')
const { admin, accountant } = require('../../helpers/role')
const mongoose = require('mongoose')
const itemModel = mongoose.model('items')

const upload = require('../../services-backend/image-upload')
const singleUpload = upload.single('file')

const aws = require('aws-sdk')
const s3 = new aws.S3()

module.exports = server => {
  server.get('/api/item', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const result = await itemModel.find({})
    res.send(result)
  })

  server.get('/api/item/:id', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const { id } = req.params
    if (!id) res.status(403).send({ message: 'Need Parameter' })

    const result = await itemModel.findById(id)
    res.send(result)
  })

  server.post('/api/item', ValidateToken, ValidateRole([admin, accountant]), singleUpload, async (req, res) => {
    const { bodyForm } = req.body
    const { itemType, itemCode, itemName, itemFactory, itemColor, itemSkin, itemPrice, itemRemarks } = JSON.parse(bodyForm)
    const user = req.user

    const found = await itemModel.findOne({ itemCode })
    if (found) return res.status(403).send({ message: 'Item Code is Duplicate.' })

    await itemModel({
      itemCode,
      itemName,
      itemFactory,
      itemColor,
      itemSkin,
      itemPrice,
      itemRemarks,
      itemTypeId: itemType.id,
      itemTypeName: itemType.label,
      imageUrl: req.file ? req.file.location : '',
      imageKey: req.file ? req.file.key : '',
      RecordIdBy: user.name,
      RecordNameBy: user.nickname,
      RecordDate: Date.now(),
      LastModifyById: user.name,
      LastModifyByName: user.nickname,
      LastModifyDate: Date.now(),
    }).save()

    res.send({ message: 'Item is already inserted.' })
  })

  server.delete('/api/item/:id', ValidateToken, ValidateRole([admin, accountant]), async (req, res) => {
    const { id } = req.params
    if (!id) res.status(403).send({ message: 'Need Parameter' })
    await itemModel.findByIdAndDelete(id)
    res.send({ message: 'Item is already deleted.' })
  })

  server.put('/api/item/:id', ValidateToken, ValidateRole([admin, accountant]), singleUpload, async (req, res) => {
    const { id } = req.params
    const { bodyForm } = req.body
    const { itemType, itemCode, itemName, itemFactory, itemColor, itemSkin, itemPrice, itemRemarks } = JSON.parse(bodyForm)
    const user = req.user

    if (!id) res.status(403).send({ message: 'Need Parameter' })
    const found = await itemModel.findById(id)
    if (!found) res.status(403).send({ message: 'Item is not found.' })

    if (found.imageKey !== '' && req.file) {
      s3.deleteObject(
        {
          Bucket: process.env.S3_BUCKET,
          Key: found.imageKey,
        },
        (err, data) => {
          console.log(err, data)
        },
      )
    }

    await itemModel
      .updateOne(
        { _id: id },
        {
          $set: {
            itemName,
            itemFactory,
            itemColor,
            itemSkin,
            itemPrice,
            itemRemarks,
            itemTypeId: itemType.id,
            itemTypeName: itemType.label,
            imageUrl: req.file ? req.file.location : '',
            imageKey: req.file ? req.file.key : '',
            LastModifyById: user.name,
            LastModifyByName: user.nickname,
            LastModifyDate: Date.now(),
          },
        },
      )
      .exec()

    res.send({ message: 'Item is already updated.' })
  })
}
