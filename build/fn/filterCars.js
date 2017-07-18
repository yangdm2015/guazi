/**
 * Created by Shan on 2017/7/15.
 */


let cheerio = require('cheerio')
function filterCars (html) {
  let $ = cheerio.load(html)
  let carsas = $('.carlist li a')
  let carsInfo = []
  carsas.each((index, item) => {
    let a = $(item).attr('href')
    let title = $(item).children('.t').text()
    let ageInfo = $(item).children('.t-i').text()
    let price = $(item).children('.t-price').children('p').text()
    // let brandId = ''
    // console.log('brandList[0] = ',brandList[0])

    // console.log('brandId = ', brandId)
    let car = {
      title, ageInfo, price, a
    }
    // console.log('car = ', car)
    // if (+price < 12) {cls
    //   carsInfo.push(car)
    // }
    carsInfo.push(car)
  })

  return carsInfo
  // fs.writeFile('cars-info.json', JSON.stringify(carsInfo))
}
exports.filterCars = filterCars
