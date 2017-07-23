/**
 * Created by Shan on 2017/7/15.
 */
let baseUrl = 'https://www.guazi.com'
let getHtml = require('./getHtml').getHtml
let rademTimeGen = require('./rademTimeGen').rademTimeGen
let cheerio = require('cheerio')
let times = 0
function getCarArryDetail ({carsInfo, newCarsInfo}) {
  // console.log('carsInfo = ',carsInfo)
  // console.log('newCarsInfo = ',newCarsInfo)
  var car = carsInfo.shift()
  let url = baseUrl + car.a
  // console.log('url = ', url)
  // return new Promise(resolve => {
  //   resolve({carsInfo, newCarsInfo})
  // })
  return getHtml(url).then(html => {
    let $ = cheerio.load(html)
    let time = $('.assort .one span').text()
    let year = time.split('-')[0]
    let month = time.split('-')[1]
    let location = $('.assort .three span').text()
    let guaziOriginPrice = $('.newcarprice').text()
    let auto = $('.assort .last span').text()
    let focusNum = $($('.js-layer-tip .fc-green')[0]).text()
    let soldAlready = $('.graybtn').text()
    // soldAlready = !!soldAlready

    if (guaziOriginPrice.search('新车指导价') > -1) {
      guaziOriginPrice = /(新车指导价)(\d+(.)\d+)/g.exec(guaziOriginPrice)[2]
    } else {
      guaziOriginPrice = $('.pricestype').text()
    }
    car.originPriceMiss = true
    car.year = year
    car.month = month
    car.location = location
    car.guaziOriginPrice = guaziOriginPrice
    car.focusNum = focusNum
    car.soldAlready = !!soldAlready

    times++
    let rt = rademTimeGen(2030, times)
    console.log('car.title = ', car.title, 'and rt = ', rt)
    return new Promise(resolve => {
      if (location === '北京' && auto !== '手动') {
        newCarsInfo.push(car)
      }
      setTimeout(function () {
        resolve({carsInfo, newCarsInfo})
      }, rt)
    })
  })
}
exports.getCarArryDetail = getCarArryDetail
