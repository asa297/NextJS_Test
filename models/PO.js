const mongoose = require('mongoose')

const { Schema } = mongoose

const groupSchema = require('./Group')
const orgSchema = require('./Organization')
const sellerSchema = require('./Seller')

const POSchema = new Schema({
  orderId: Number,
  group: groupSchema,
  org: orgSchema,
  seller: sellerSchema,
  listItems: [],
  subTotal: mongoose.Decimal128,
  discount: { type: Number, default: 0 },
  discountPercent: Number,
  credit: mongoose.Decimal128,
  creditcharge: mongoose.Decimal128,
  creditchargePercent: Number,
  receiveCash: mongoose.Decimal128,
  changeCash: mongoose.Decimal128,
  grandTotal: mongoose.Decimal128,
  RecordIdBy: String,
  RecordNameBy: String,
  RecordDate: Date,
  LastModifyById: String,
  LastModifyByName: String,
  LastModifyDate: Date,
})

mongoose.model('poes', POSchema)
