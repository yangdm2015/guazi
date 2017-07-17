/**
 * Created by Shan on 2017/7/16.
 */
let getHtml = require('./getHtml').getHtml
let getPageNumFromHTML = require('./get-pageNum-from-html').getPageNumFromHTML
let recordCars = require('./recordCars').recordCars
let urlInit = 'https://www.guazi.com/bj/buy/#bread'
let urls = [urlInit];
let carInfo = []
let getHtmlStack = [recordCars]
function carsJsongen(){
  // console.log('typeof getHtml = ',typeof getHtml)
  getHtml(urlInit).then(function(html){
    let pageNumber = getPageNumFromHTML(html)
    for (let i = 2; i <= pageNumber; i++) {
      let url = 'https://www.guazi.com/bj/buy/o' + i + '/#bread'
      urls.push(url)
      getHtmlStack.push(recordCars)
    }
    getHtmlStack.reduce(function (cur, next) {
      return cur.then(next);
    }, Promise.resolve({urls, carInfo}));
    console.log('getHtmlStack.length = ', getHtmlStack.length)
  })
}
exports.carsJsongen = carsJsongen
