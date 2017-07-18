/**
 * Created by Shan on 2017/7/15.
 */
// let Promise = require("bluebird");
// let brandList = require('../../src/static-data/brandList').brandList
let fs = require('fs')
let carsJsongen = require('./genCarsInfoJson').carsJsongen
let getHtml = require('./getHtml').getHtml
let filterCars = require('./filterCars').filterCars
let getCarDetail = require('./getCarDetail').getCarDetail
let urlInit = 'https://www.guazi.com/bj/buy/#bread'
let baseUrl = 'https://www.guazi.com'
let getCarBrandId = require('./getCarBrandId').getCarBrandId

function crawler () {

  // let bl = []
  // for (let i in brandList) {
  //   bl = bl.concat(brandList[i])
  // }
  // brandList.forEach(item => {
  //   bl = bl.concat(item)
  // })
  // fs.writeFile('bl.json', JSON.stringify(bl), function () {
  //   console.log('complete')
  // })
  // console.log(brandList.A[0])
  getHtml(urlInit)
    .then(html => {
      // console.log('html =',html)
      console.log('html back')
      let cars = filterCars(html)
      console.log('cars[0] = ',cars[0])
      let brandId = getCarBrandId(cars[0])
      console.log('brandId = ',brandId)
      // let detailUrl = baseUrl + cars[0].a
      // console.log('detailUrl = ',detailUrl)
      // return getHtml(detailUrl)
      // console.log(cars[0])
    })
    // .then(html => {
    //   let detail = getCarDetail(html)
    //   console.log('detail = ', detail)
    // })
  // carsJsongen()
}
exports.crawler = crawler
