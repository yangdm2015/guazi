/**
 * Created by Shan on 2017/7/24.
 */
let cheerio = require('cheerio')
let getHtml = require('./getHttpHtml').getHtml
let proxy360Url = 'http://www.proxy360.cn/default.aspx'
function cheerioTest () {
  return getHtml(proxy360Url).then(html => {
    let $ = cheerio.load(html)
    let proxylistitemwarp = $('.proxylistitem')
    let item = proxylistitemwarp[0]
    let s = $($(item).find('span')[0]).text()
    console.log('s = ',s)
  })
}
exports.cheerioTest = cheerioTest
