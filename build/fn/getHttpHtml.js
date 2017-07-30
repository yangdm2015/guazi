/**
 * Created by Shan on 2017/7/15.
 */
var http = require('http')
var request = require('request')
var j = request.jar()
var cookie = request.cookie('auth=745674eaada799a6d8982aff45146432,' +
  'JSESSIONID=B28A9CCE0C444F94213F6B8710EAFCFF,'
  // +
  // 'UM_distinctid=15d92b8d7d9ee-0bc14312675b4c-414a0229-384000-15d92b8d7da11c,' +
  // 'CNZZDATA1253707717=933068170-1501404859-http%253A%252F%252Fwww.goubanjia.com%252F%7C1501404859' +
  // 'Hm_lvt_2e4ebee39b2c69a3920a396b87bbb8cc=1500829365,1501377169' +
  // 'Hm_lpvt_2e4ebee39b2c69a3920a396b87bbb8cc=1501405175'
)
function getHtml (url) {
  // j.setCookie(cookie, url)
  // var options = {
  //   url: url,
  //   port: 80,
  //   // path: '/upload',
  //   method: 'GET',
  //   jar: j
  //   // headers: {
  //   //   'Content-Type': 'text/html;charset=UTF-8',
  //   //   'Connection': 'keep-alive',
  //   //   'Content-Encoding': 'gzip',
  //   //   'Content-Language': 'en-US',
  //   //   'Date': 'Sun, 30 Jul 2017 05:15:54 GMT',
  //   //   'Server': 'Tengine/2.1.2',
  //   //   'Set-Cookie': 'JSESSIONID=7FD4D0E9543E86FD124A7D4C22811CC6; Path=/; HttpOnly',
  //   //   'T-SITE': 'www.goubanjia.com',
  //   //   'Transfer-Encoding': 'chunked',
  //   //   'Vary': 'Accept-Encoding'
  //   // }
  // }
  // request.cookie('auth=745674eaada799a6d8982aff45146432')
  // request.cookie('JSESSIONID=54303635F00D2D42A98F3A9B4D81C812')
  // request.cookie('UM_distinctid=15d92b8d7d9ee-0bc14312675b4c-414a0229-384000-15d92b8d7da11c')
  // request.cookie('CNZZDATA1253707717=933068170-1501404859-http%253A%252F%252Fwww.goubanjia.com%252F%7C1501404859')
  // request.cookie('Hm_lvt_2e4ebee39b2c69a3920a396b87bbb8cc=1500829365,1501377169')
  // request.cookie('Hm_lpvt_2e4ebee39b2c69a3920a396b87bbb8cc=1501405175')
  // console.log('options = ', options)
  return new Promise(function (resolve, rej) {
    let options = {
      uri: url,
      port: 80,
      // path: '/upload',
      method: 'GET'
    }

    console.log('options = ', options)
    // request(options, (error, response, body) => {
    request(url, (error, response, body) => {
      // let header = response.headers
      // console.log('header = ', header)
      console.log('error = ', error)
      console.log('response = ', response)
      resolve(body)
      // console.log('body = ', body)
      // console.log('response.statusCode = ', response.statusCode)
    })

    // http.get(url, function (res) {
    //   var html = ''
    //   res.on('data', function (data) {
    //     html += data
    //   })
    //   res.on('end', function () {
    //     resolve(html)
    //   })
    // }).on('error', function (e) {
    //   console.log('e = ',e)
    //   console.log('获取数据出错')
    // })
    //   .on('connect', function (req, cltSocket, head) {
    //   console.log('on connect !')
    //   console.log('head = ', head)
    // }).on('response', function (req, cltSocket, head) {
    //   console.log('on response !')
    //   console.log('req = ', req)
    // })
  })
}
exports.getHtml = getHtml
