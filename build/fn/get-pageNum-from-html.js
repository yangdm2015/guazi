/**
 * Created by Shan on 2017/7/16.
 */
let cheerio = require('cheerio')
function getPageNumFromHTML(html) {
  let $ = cheerio.load(html);
  let pageNum = $('.pageLink ').children().last().prev().children('a').children('span').text()
  return pageNum;
}
exports.getPageNumFromHTML = getPageNumFromHTML
