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
let getCarArryDetail = require('./getCarArryDetail').getCarArryDetail
let getCarBrandId = require('./getCarBrandId').getCarBrandId
function crawler () {
  // let getHtmlStack = []
  // carsInfo.forEach((index, item) => {
  //   getHtmlStack.push(getCarArryDetail)
  // })
  // let newCarsInfo = []
  // getHtmlStack.reduce(function (cur, next) {
  //   return cur.then(next)
  // }, Promise.resolve({carsInfo, newCarsInfo})).catch(e => {
  //   console.log('e = ', e)
  // })
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

  // getHtml(urlInit)
  //   .then(html => {
  //     // console.log('html =',html)
  //     console.log('html back')
  //     return filterCars(html)
  //     // let cars = filterCars(html)
  //     // console.log('cars[0] = ',cars[0])
  //     // return getCarDetail(cars[0].a)
  //     // let brandId = getCarBrandId(cars[0])
  //     // console.log('brandId = ',brandId)
  //     // let detailUrl = baseUrl + cars[0].a
  //     // console.log('detailUrl = ',detailUrl)
  //     // return getHtml(detailUrl)
  //     // console.log(cars[0])
  //   }).then(e => {
  //     console.log('newCarsInfo.length = ', e.newCarsInfo.length)
  //     console.log('newCarsInfo. = ', e.newCarsInfo)
  //   }).catch(e => {
  //     console.log('e = ', e)
  //   })

  // .then(carsInfo => {
  //   // let detail = getCarDetail(html)
  //   console.log('carsInfo = ', carsInfo)
  // })
  carsJsongen()
}
exports.crawler = crawler
