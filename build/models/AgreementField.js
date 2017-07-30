/**
 * Created by Shan on 2017/7/26.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var mongoset = require('../db/mongoset')
var markerIdSchema = new mongoose.Schema({
  endMarkerId: String,
  startMarkerId: String,
})

var AgreementFieldSchema = new Schema({
  highLight: String,
  propertyName: String,
  type: String,
  key: String,
  markerId: markerIdSchema,
  height: Number,
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

AgreementFieldSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})
AgreementFieldSchema.statics = {
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

var AgreementField = mongoset.db.model('comments', AgreementFieldSchema)
module.exports = AgreementField
