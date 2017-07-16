/**
 * Created by Shan on 2017/7/15.
 */
let fs = require('fs')
let cheerio = require('cheerio')
function filterCars(html) {
  let $ = cheerio.load(html);

  let cars = $('.carlist li');
  let names = $('.carlist li a .t');
  let carsas = $('.carlist li a');
  // console.log('cars[0].children[1]',cars[0].children[1])
  // console.log('names[0].html() = ',$(names[0]).text())// 大众朗逸 2011款 1.6L 自动品悠版
  // console.log('carsas.length=', carsas.length)
  let carsInfo = []
  carsas.each((index, item) => {
    let title = $(item).children('.t').text()
    let ageInfo = $(item).children('.t-i').text()
    let price = $(item).children('.t-price').children('p').text()
    let car = {
      title, ageInfo, price
    }
    carsInfo.push(car)

  })
  return carsInfo;
  // fs.writeFile('cars-info.json', JSON.stringify(carsInfo))
}
exports.filterCars = filterCars
