/**
 * Created by Shan on 2017/7/15.
 */
// let Promise = require("bluebird");
let carsJsongen = require('./genCarsInfoJson').carsJsongen
let getHtml = require('./getHtml').getHtml
let filterCars = require('./filterCars').filterCars
let getCarDetail = require('./getCarDetail').getCarDetail
let urlInit = 'https://www.guazi.com/bj/buy/#bread'
let baseUrl = 'https://www.guazi.com/'

function crawler() {
  getHtml(urlInit)
    .then(html => {
      console.log('html back')
      let cars = filterCars(html)
      let detailUrl = baseUrl + cars[0].a
      return getHtml(detailUrl)
      // console.log(cars[0])
    })
    .then(html =>{
      let detail = getCarDetail(html)
    })
  // carsJsongen()
}
exports.crawler = crawler;
