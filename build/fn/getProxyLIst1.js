/**
 * Created by Shan on 2017/7/23.
 */
let cheerio = require('cheerio')
// let getHtml = require('./getHttpHtml').getHtml
let getHtml = require('./getHttpHtmlOld').getHtml
let proxy360Url = 'http://www.proxy360.cn/default.aspx'
let goubanjiaUrl = 'http://www.goubanjia.com'
let baiduUrl = 'http://www.baidu.com'
let xicidailiUrl = 'http://www.xicidaili.com/'
let cnproxyUrl = 'http://cn-proxy.com'
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
    // console.log('html = ',html)
    let $ = cheerio.load(html)
    let proxylistitemwarp = $('.proxylistitem')
    // let tbCommon = $('.tbCommon')
    let l = []
    // let item = proxylistitemwarp[0]
    // console.log('item = ',item)
    // let ip = $($(item).children('.tbBottomLine')[1]).text()
    // console.log('proxylistitemwarp.length', proxylistitemwarp.length)
    // for (let i = 0, len = proxylistitemwarp.length; i < len; i++) {
    proxylistitemwarp.each(function (i, item) {
      // item = proxylistitemwarp[i]
      // let host = $($($(item).children('div')[0]).children()[0]).text()
      let host = $($(item).find('span')[0]).text()
      host = host.split('\n')[1].trim()
      // console.log('host = ', host)
      let port = $($(item).find('span')[1]).text()
      port = port.split('\n')[1].trim()
      l.push({host, port})
    })
    // }
    // return Promise.resolve(l)
    return l
  })
    .then(l => {
      // console.log('l = ',l)
      let fnList = []
      for (let i = 0, len = l.length; i < len; i++) {
        let item = l[i]
        fnList.push(pwrap(proxy, item))
      }
      return Promise.all(fnList)
    })
    .then(l => {
      return writeFileAsync(recordFile, l)
    })
    .then(l => {
      console.log('finished ')
    })
}
function testGoubanjiaProxy () {
  return getHtml(cnproxyUrl).then(html => {
    console.log(html)
    // let $ = cheerio.load(html)
    // let ipTable = $('.sortable')[1]
    // let iptbody = $(ipTable).find('tbody')
    // let ipwraps = $(iptbody).find('tr')
    // let ipwrap = ipwraps[1]
    // let ipwraTds = $(ipwrap).find('td')
    // let ip = $(ipwraTds[0]).text()
    // let port = $(ipwraTds[1]).text()
    // console.log('ip = ', ip)
    // console.log('port = ', port)

    let l = []
    // let item = ipwrap[0]
    // let ips = item.children()
    // console.log('ips = ', ips)

    // let ip = $($(item).children('.tbBottomLine')[1]).text()
    // console.log('proxylistitemwarp.length', proxylistitemwarp.length)
    // for (let i = 0, len = proxylistitemwarp.length; i < len; i++) {
    // ipwrap.each(function (i, item) {
    //   let host = $($(item).find('span')[0]).text()
    //   host = host.split('\n')[1].trim()
    //   let port = $($(item).find('span')[1]).text()
    //   port = port.split('\n')[1].trim()
    //   l.push({host, port})
    // })
    return l
  })
  // .then(l => {
  //   let fnList = []
  //   for (let i = 0, len = l.length; i < len; i++) {
  //     let item = l[i]
  //     fnList.push(pwrap(proxy, item))
  //   }
  //   return Promise.all(fnList)
  // })
  // .then(l => {
  //   return writeFileAsync(recordFile, l)
  // })
    .then(l => {
      console.log('finished ')
    })
    .catch(e => {
      console.log('出错了！， e = ', e)
    })
}
function testxicidailiProxy () {
  return getHtml(xicidailiUrl).then(html => {
    // console.log(html)
    let $ = cheerio.load(html)
    let trs = $('#ip_list tbody tr')
    // let trs0 = trs[0]
    // let trs2 = trs[2]
    // let trs0td = $(trs0).find('td')
    // let trs0td0 = $(trs0td[0])
    // let trs0td1 = $(trs0td[1])
    // let trs2td = $(trs2).find('td')
    // let trs2td0 = $(trs2td[0])
    // let trs2td1 = $(trs2td[1])
    // console.log('trs2td1.text() = ', trs2td1.text())
    // console.log('typeof trs0td1.text() = ', typeof trs0td1.text())
    // console.log('trs0td1[0] = ', trs0td1[0])
    // console.log('trs2td1[0] = ', trs2td1[0])
    // console.log('trs0td1.text().length = ',typeof trs0td1.text().length)
    // console.log('trs.length = ', trs.length)
    // console.log('trs2td0.length = ', trs2td0.length)
    // console.log('trs2td0 = ', trs2td0)
    // console.log('trs0td0.length = ', trs0td0.length)
    // console.log('trs0td0 = ', trs0td0)
    // console.log('trs0td.length() = ',trs0td0.length())
    // console.log('typeof trs0td0 = ',typeof trs0td0)

    let l = []
    trs.each(function (i, item) {
      let trsTds = $(item).find('td')
      let trsTd1 = $(trsTds[1])
      if (trsTd1[0]) {
        let host = trsTd1.text()
        let trsTd2 = $(trsTds[2])
        let port = trsTd2.text()
        l.push({host, port})
      }
    })
    return l
  })
    .then(l => {
      let fnList = []
      for (let i = 0, len = l.length; i < len; i++) {
        let item = l[i]
        fnList.push(pwrap(proxy, item))
      }
      return Promise.all(fnList)
    })
    .then(l => {
      return writeFileAsync(recordFile, l)
    })
    .then(l => {
      console.log('finished ')
    })
    .catch(e => {
      console.log('出错了！， e = ', e)
    })
}

exports.testProxy = testProxy
exports.testGoubanjiaProxy = testGoubanjiaProxy
exports.testxicidailiProxy = testxicidailiProxy
