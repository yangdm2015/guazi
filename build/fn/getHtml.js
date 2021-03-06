/**
 * Created by Shan on 2017/7/15.
 */
var https = require('https')
function getHtml(url) {
  return new Promise(function (resolve, rej) {
    https.get(url, function (res) {
      var html = ''
      res.on('data', function (data) {
        html += data;
      })
      res.on('end', function () {
        resolve(html)
      })
    }).on('error', function () {
      console.log('获取数据出错')
    })
  })
}
exports.getHtml = getHtml;
