/**
 * Created by Shan on 2017/7/23.
 */
let cheerio = require('cheerio')
let getHtml = require('./getHttpHtml').getHtml
let proxy360Url = 'http://www.proxy360.cn/default.aspx'
let proxy = require('./proxy').proxy
let writeFileAsync = require('./writeFileAsync').writeFileAsync
let recordFile = ('proxyList.json')
function pwrap (fn, l) {
  return new Promise((resolve, reject) => {
    resolve(fn(l))
  }, e => {
    console.log('err in pwrap,e = ', e)
  })
  // return fn(l);
}

function testProxy () {
  return getHtml(proxy360Url).then(html => {
    let $ = cheerio.load(html)
    let proxylistitemwarp = $('.proxylistitem')
    let l = []
    let item = proxylistitemwarp[0]
    // let ip = $($(item).children('.tbBottomLine')[1]).text()
    console.log('proxylistitemwarp.length', proxylistitemwarp.length)
    for (let i = 0, len = proxylistitemwarp.length; i < len; i++) {
      item = proxylistitemwarp[i]
      let host = $($($(item).children('div')[0]).children()[0]).text()
      host = host.split('\n')[1].trim()
      // console.log('host = ', host)
      let port = $($($(item).children('div')[0]).children()[1]).text()
      port = port.split('\n')[1].trim()
      l.push({host, port})
    }
    // return Promise.resolve(l)
    return l
  })
    .then(l => {
      let fnList = []
      // console.log('l = ', l)
      for (let i = 0, len = l.length; i < len; i++) {
        let item = l[i]
        fnList.push(pwrap(proxy, item))
      }
      return Promise.all(fnList)
    })
    .then(l =>{
      return writeFileAsync(recordFile, l)
    })
    .then(l => {
      console.log('finished ')
    })
}

exports.testProxy = testProxy
