/**
 * Created by Shan on 2017/7/16.
 */
var filterCars = require('./filterCars').filterCars
var Promise = require("bluebird");
var https = require('https')
let fs = require('fs')

function getcars({urls,carInfo}) {
  return new Promise(function (resolve, rej) {
    let url = urls.shift()
    https.get(url, function (res) {
      let html = ''
      res.on('data', function (data) {
        html += data;
      })
      res.on('end', function () {
        let newCatInfo = filterCars(html)
        carInfo = carInfo.concat(newCatInfo)
        console.log('carInfo.length = ',carInfo.length)
        fs.writeFile('car-info.json', JSON.stringify(carInfo),function(err){
          resolve({urls,carInfo})
        })
      })
      res.on('error', function (e) {
        console.log('获取数据出错')
      });
    });
  })
}
exports.getcars = getcars
