/**
 * Created by Shan on 2017/7/15.
 */

let cheerio = require('cheerio')
function getCarDetail (html) {
  // console.log('html = ', html)
  let $ = cheerio.load(html)
  let time = $('.assort .one span').text()
  let year = time.split('-')[0]
  let month = time.split('-')[1]
  let location = $('.assort .three span').text()
  let guaziOriginPrice = $('.newcarprice').text()
  // console.log('guaziOriginPrice = ',guaziOriginPrice)
  guaziOriginPrice = /(新车指导价)(\d+(.)\d+)/g.exec(guaziOriginPrice)[2]
  let carsInfo = {year, month, location, guaziOriginPrice}

  // carsas.each((index, item) => {
  //   let a = $(item).attr('href')
  //   let title = $(item).children('.t').text()
  //   let ageInfo = $(item).children('.t-i').text()
  //   let price = $(item).children('.t-price').children('p').text()
  //   let car = {
  //     title, ageInfo, price, a
  //   }
  //   carsInfo.push(car)
  // })
  return carsInfo
  // fs.writeFile('cars-info.json', JSON.stringify(carsInfo))
}
exports.getCarDetail = getCarDetail
