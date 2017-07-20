/**
 * Created by Shan on 2017/7/15.
 */
'use strict';
// let Promise = require("bluebird");
// let brandList = require('../../src/static-data/brandList').brandList
let fs = require('fs')
let carsJsongen = require('./genCarsInfoJson').carsJsongen
let getHtml = require('./getHtml').getHtml
let filterCars = require('./filterCars').filterCars
let getCarDetail = require('./getCarDetail').getCarDetail
let urlInit = 'https://www.guazi.com/bj/buy/#bread'
let urlTest = 'https://www.guazi.com/bj/buy/#bread'
let getCarArryDetail = require('./getCarArryDetail').getCarArryDetail
let getCarBrandId = require('./getCarBrandId').getCarBrandId
function crawler () {

  // getHtml(urlInit)
  //   .then(html => {
  //     console.log('html back')
  //     return filterCars(html)
  //   }).then(e => {
  //     console.log('newCarsInfo.length = ', e.newCarsInfo.length)
  //     console.log('newCarsInfo. = ', e.newCarsInfo)
  //   }).catch(e => {
  //     console.log('e = ', e)
  //   })

  carsJsongen()
}
exports.crawler = crawler
