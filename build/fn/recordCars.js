/**
 * Created by Shan on 2017/7/16.
 */
let dateFormat = require('./dateFormat').dateFormat
var filterCars = require('./filterCars').filterCars
let rademTimeGen = require('./rademTimeGen').rademTimeGen
let getHtml = require('./getHtml').getHtml
let writeFileAsync = require('./writeFileAsync').writeFileAsync
var Promise = require('bluebird')
// var https = require('https')
// let fs = require('fs')
// let recordFile = './src/static-data/car-info.json'
let recordFile = 'car-info' + dateFormat(new Date(), '{y}{m}{d}') + '.json'
let times = 0
function recordCars ({urls, carInfo}) {
  let url = urls.shift()
  return getHtml(url).then(html => {
    return filterCars(html)
  }).then(e => {
    let newCarsInfo = e.newCarsInfo
    console.log('newCarsInfo.length = ', newCarsInfo.length)
    carInfo = carInfo.concat(newCarsInfo)
    return writeFileAsync(recordFile, carInfo)
  }).then(e => {
    times++
    let rt = 2030
    // let rt = rademTimeGen(2030, times)
    return new Promise(resolve => {
      // setTimeout(function () {
      console.log('carInfo.length = ', carInfo.length, ' and url = ', url)
      resolve({urls, carInfo})
      // }, rt)
    })
  }).catch(err => { console.log('err = ', err) })
}
exports.recordCars = recordCars
