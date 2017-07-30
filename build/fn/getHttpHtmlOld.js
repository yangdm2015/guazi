/**
 * Created by Shan on 2017/7/30.
 */

var http = require('http')
function getHtml (url) {
  return new Promise(function (resolve, rej) {
    http.get(url, function (res) {
      var html = ''
      res.on('data', function (data) {
        html += data
      })
      res.on('end', function () {
        resolve(html)
      })
    }).on('error', function (e) {
      console.log('e = ',e)
      console.log('获取数据出错')
    })
  })
}
exports.getHtml = getHtml
