/**
 * Created by Shan on 2017/7/15.
 */
let getCarArryDetail = require('./getCarArryDetail').getCarArryDetail
let getCarBrandId = require('./getCarBrandId').getCarBrandId
let cheerio = require('cheerio')
let sumarySurvive = require('./sumarySurvive').sumarySurvive
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
    // if (price < 8.5) {
    //   console.log('car =', car)
    // }
    if (sumarySurvive(car)) {
      // console.log('Survived!,car = ', car)
      carsInfo.push(car)
      getHtmlStack.push(getCarArryDetail)
    }
    // carsInfo.push(car)
  })
  // console.log('carsInfo.length = ',carsInfo.length)
  let newCarsInfo = []
  if (getHtmlStack.length === 0) {
    return Promise.resolve({carsInfo, newCarsInfo})
  } else {
    return getHtmlStack.reduce(function (cur, next) {
      return cur.then(next)
    }, Promise.resolve({carsInfo, newCarsInfo}))
  }
  // return carsInfo
}
exports.filterCars = filterCars
