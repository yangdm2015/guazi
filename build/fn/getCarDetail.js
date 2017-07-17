/**
 * Created by Shan on 2017/7/15.
 */
let cheerio = require('cheerio')
function getCarDetail(html) {
  let $ = cheerio.load(html)
  let carsas = $('.carlist li a')
  let carsInfo = []
  carsas.each((index, item) => {
    let a = $(item).attr('href')
    let title = $(item).children('.t').text()
    let ageInfo = $(item).children('.t-i').text()
    let price = $(item).children('.t-price').children('p').text()
    let car = {
      title, ageInfo, price, a
    }
    carsInfo.push(car)
  })
  return carsInfo
  // fs.writeFile('cars-info.json', JSON.stringify(carsInfo))
}
exports.getCarDetail = getCarDetail
