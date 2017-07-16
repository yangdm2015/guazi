/**
 * Created by Shan on 2017/7/16.
 */
var Promise = require("bluebird");
var https = require('https')
function get(url) {
  return new Promise(function (resolve, rej) {
    https.get(url, function (res) {
      var html = ''
      res.on('data', function (data) {
        html += data;
      })
      res.on('end', function () {
        resolve(html)
      })
      res.on('error', function (e) {
        console.log('获取数据出错')
      });
    });
  })
}
exports.get = get
