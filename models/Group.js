const mongoose = require('mongoose')
const { Schema } = mongoose

const GroupSchema = new Schema({
  orgId: { type: Schema.Types.ObjectId, ref: 'organizations' },
  orgName: String,
  orgTypeId: Number,
  orgTypeName: String,
  orgCode: String,
  orgComA: { type: Number, default: 0 },
  orgComB: { type: Number, default: 0 },
  groupCode: String,
  groupStickerNumber: String,
  groupRemarks: String,
  guideName: String,
  RecordIdBy: String,
  RecordNameBy: String,
  RecordDate: Date,
  LastModifyById: String,
  LastModifyByName: String,
  LastModifyDate: Date,
})

mongoose.model('groups', GroupSchema)
