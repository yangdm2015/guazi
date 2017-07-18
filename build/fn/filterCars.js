/**
 * Created by Shan on 2017/7/15.
 */
let getCarArryDetail = require('./getCarDetail').getCarArryDetail
let getCarBrandId = require('./getCarBrandId').getCarBrandId
let cheerio = require('cheerio')
function filterCars (html) {
  let $ = cheerio.load(html)
  let carsas = $('.carlist li a')
  let carsInfo = []
  let getHtmlStack = []
  carsas.each((index, item) => {
    let a = $(item).attr('href')
    let title = $(item).children('.t').text()
    let ageInfo = $(item).children('.t-i').text()
    let mileage = ageInfo.split('|')[1]
    mileage = mileage.split('万')[0]
    let price = $(item).children('.t-price').children('p').text()
    let brandId = getCarBrandId({title})
    price = price.split('万')[0]
    let car = {
      title, ageInfo, mileage, price, a, brandId
    }
    if (+price < 12) {
      carsInfo.push(car)
      getHtmlStack.push(getCarArryDetail)
    }
    let newCarsInfo = []
    return getHtmlStack.reduce(function (cur, next) {
      return cur.then(next)
    }, Promise.resolve({carsInfo, newCarsInfo}))
    // carsInfo.push(car)
  })

  // return carsInfo
}
exports.filterCars = filterCars
