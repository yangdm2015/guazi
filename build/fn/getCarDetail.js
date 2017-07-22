/**
 * Created by Shan on 2017/7/15.
 */
let baseUrl = 'https://www.guazi.com'
let getHtml = require('./getHtml').getHtml
let cheerio = require('cheerio')
function getCarDetail (a) {
  let url = baseUrl + a
  return getHtml(url).then(html => {
    let $ = cheerio.load(html)

    let time = $('.assort .one span').text()
    let year = time.split('-')[0]
    let month = time.split('-')[1]
    let location = $('.assort .three span').text()
    let auto = $('.assort .last span').text()
    let guaziOriginPrice = $('.newcarprice').text()
    guaziOriginPrice = /(新车指导价)(\d+(.)\d+)/g.exec(guaziOriginPrice)[2]
    let carsInfo = {year, month, location, guaziOriginPrice, auto}
    return carsInfo
  })
}
exports.getCarDetail = getCarDetail
