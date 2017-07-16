/**
 * Created by Shan on 2017/7/15.
 */
let Promise = require("bluebird");
let https = Promise.promisifyAll(require('https'))
let getcars = require('./getcars').getcars
let url = 'https://www.guazi.com/bj/buy/#bread'
let cheerio = require('cheerio')
let filterCars = require('./filterCars').filterCars
let fs = require('fs')
let get = require('./httpsAsyncGet').get
let urls = [url];
let carInfo = []
let getHtmlStack = []
// function getcars(url){
//   let htmlPromise = get(url)
//   return htmlPromise.then(function(html){
//     let newCars = filterCars(html)
//     cars.concat(newCars)
//   })
// }


function crawler() {
  // console.log('carInfo = ',carInfo)
  // console.log('urls = ',urls)
  for (let i = 2; i <= 3; i++) {
    let url = 'https://www.guazi.com/bj/buy/o' + i + '/#bread'
    urls.push(url)
    getHtmlStack.push(getcars)
  }
  getHtmlStack.reduce(function (cur, next) {
    return cur.then(next);
  }, Promise.resolve({urls, carInfo}));
  console.log('carInfo = ',carInfo)



// get(url).then(function (html) {
//   let $ = cheerio.load(html);
//   let pageNum = $('.pageLink ').children().last().prev().children('a').children('span').text()
//   let cars = [];
//   for (let i = 2; i <= 3; i++) {
//     let url = 'https://www.guazi.com/bj/buy/o' + i + '/#bread'
//     urls.push(url)
//     getHtmlStack.push(function () {
//       cars = cars.concat(get(url))
//     })
//   }
//   let p1 = get(url)
//   urls.reduce(function (p1, nowurl) {
//     p1.then(function (e) {
//       return getcars(nowurl)
//     })
//   })
// })
// https.getAsync(url).then(function(res){
//   console.log(res);
// },function(res){
//   console.log('wrong')
//   fs.writeFile('wrong.json', JSON.stringify(res))
//   // console.log(res)
// })
// https.get(url, function (res) {
//   let html = ''
//   res.on('data', function (data) {
//     html += data;
//     // console.log('html =',html)
//   })
//   res.on('end', function () {
//     let $ = cheerio.load(html);
//     let pageNum = $('.pageLink ').children().last().prev().children('a').children('span').text()
//     // let pageNum = $('.pageLink li:last-of-type').text()
//     console.log('pageNum =',pageNum)
//     // filterCars(html)
//   })
// }).on('error', function () {
//   console.log('获取数据出错')
// })
}
exports.crawler = crawler;
