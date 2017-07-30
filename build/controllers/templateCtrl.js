/**
 * Created by Shan on 2017/7/26.
 */
var Template = require('../models/Template.js')
exports.list = function (req, res) {
  console.log('index_list')
  Template.find({}, 'name status meta', function (error, templates) {
    res.json('hello')
    // res.json(templates)
  })
}
exports.create = function (req, res) {
  let templateObj = req.body
  let template = new Template(templateObj)
  template.save()
    .then(template => {
      res.json(template)
    })
    .catch(e => {
      console.log('e = ', e)
    })
  // console.log('reqBody =', reqBody)
}
