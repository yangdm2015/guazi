/**
 * Created by Shan on 2017/7/16.
 */
var filterCars = require('./filterCars').filterCars
let rademTimeGen = require('./rademTimeGen').rademTimeGen
let getHtml = require('./getHtml').getHtml
let writeFileAsync = require('./writeFileAsync').writeFileAsync
var Promise = require('bluebird')
// var https = require('https')
// let fs = require('fs')
// let recordFile = './src/static-data/car-info.json'
let recordFile = './src/static-data/car-info.json'
let times = 0
function recordCars ({urls, carInfo}) {
  let url = urls.shift()
  return getHtml(url).then(html => {
    let newCatInfo = filterCars(html)
    carInfo = carInfo.concat(newCatInfo)
    return writeFileAsync(recordFile, carInfo)
  }).then(e => {
    times++
    let rt = rademTimeGen(2030, times)
    return new Promise(resolve => {
      setTimeout(function () {
        console.log('carInfo.length = ', carInfo.length, ' and rt = ', rt, ' and url = ', url)
        resolve({urls, carInfo})
      }, rt)
    })
  }).catch(err => { console.log('err = ', err) })

}
exports.recordCars = recordCars
