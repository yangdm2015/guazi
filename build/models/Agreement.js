/**
 * Created by Shan on 2017/7/26.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId
var mongoset = require('../db/mongoset')

var AgreementSchema = new Schema({
  name: String,
  type: String,
  status: String,
  agreementHTML: String,
  agreementFields: [{type: ObjectId, ref: 'AgreementFields'}],
  meta: {
    createAt: {
      type: Date,
      dafault: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

AgreementSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})
AgreementSchema.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function (id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

var Agreement = mongoset.db.model('agreements', AgreementSchema)
module.exports = Agreement
