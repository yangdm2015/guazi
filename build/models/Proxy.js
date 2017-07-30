/**
 * Created by Shan on 2017/7/26.
 */
var mongoose = require('mongoose')
// var ObjectId = mongoose.Schema.Types.ObjectId
// var voteSchema = new mongoose.Schema({ ip: 'String' });
var mongoset = require('../db/mongoset')
let ProxySchema = new mongoose.Schema({
  id: String,
  code: String,
  validity: Boolean,
  address: String,
  port: String,
  body: String,
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
ProxySchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
    this.id = this.meta.createAt.toString()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})
ProxySchema.statics = {
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
var Proxy = mongoset.db.model('proxys', ProxySchema)
module.exports = Proxy
