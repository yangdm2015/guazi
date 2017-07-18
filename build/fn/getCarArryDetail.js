/**
 * Created by Shan on 2017/7/15.
 */
let baseUrl = 'https://www.guazi.com'
let getHtml = require('./getHtml').getHtml
let cheerio = require('cheerio')
function getCarArryDetail ({carsInfo, newCarsInfo}) {
  let a = carsInfo.shift().a
  let url = baseUrl + a
  return getHtml(url).then(html => {
    let $ = cheerio.load(html)
    let time = $('.assort .one span').text()
    let year = time.split('-')[0]
    let month = time.split('-')[1]
    let location = $('.assort .three span').text()
    let guaziOriginPrice = $('.newcarprice').text()
    guaziOriginPrice = /(新车指导价)(\d+(.)\d+)/g.exec(guaziOriginPrice)[2]
    let carsInfo = {...carsInfo, year, month, location, guaziOriginPrice}
    newCarsInfo.push(carsInfo)
    return {carsInfo, newCarsInfo}
  })
}
exports.getCarArryDetail = getCarArryDetail
