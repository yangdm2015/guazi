/**
 * Created by Shan on 2017/7/16.
 */
var filterCars = require('./filterCars').filterCars
var Promise = require('bluebird')
var https = require('https')
let fs = require('fs')
// let recordFile = './src/static-data/car-info.json'
let recordFile = 'car-info.json'
let times = 0
function recordCars ({urls, carInfo}) {
  return new Promise(function (resolve, rej) {
    let url = urls.shift()
    https.get(url, function (res) {
      let html = ''
      res.on('data', function (data) {
        html += data
      })
      res.on('end', function () {
        let newCatInfo = filterCars(html)
        carInfo = carInfo.concat(newCatInfo)
        fs.writeFile(recordFile, JSON.stringify(carInfo), function (err) {
          let rt = Math.floor(Math.random() * 2030)
          times++
          if (times % 10 === 0) {
            rt = rt * 10
          } else if (times % 12 === 0) {
            rt = rt * 3.2
          } else if (times % 3 === 0) {
            rt = rt * 2.7
          } else if (times % 15 === 0) {
            rt = rt * 5
          } else if (times % 6 === 0) {
            rt = rt * 2
          } else if (times % 17 === 0) {
            rt = rt * 1.5
          }
          console.log('carInfo.length = ', carInfo.length, ' and rt = ', rt, 'and url = ', url)
          setTimeout(function () {
            resolve({urls, carInfo})
          }, rt)

        })
      })
      res.on('error', function (e) {
        console.log('获取数据出错')
      })
    })
  })
}
exports.recordCars = recordCars
