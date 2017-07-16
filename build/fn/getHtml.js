/**
 * Created by Shan on 2017/7/15.
 */
var https = require('https')
function getHTML(url){
  https.get(url, function (res) {
    var html = ''
    res.on('data', function (data) {
      html += data;
      // console.log('html =',html)
    })
    res.on('end', function () {
      let $ = cheerio.load(html);
      let pageNum = $('.pageLink ').children().last().prev().children('a').children('span').text()
      // let pageNum = $('.pageLink li:last-of-type').text()
      console.log('pageNum =',pageNum)
      // filterCars(html)
    })
  }).on('error', function () {
    console.log('获取数据出错')
  })
}
exports.getHtml = getHTML;
