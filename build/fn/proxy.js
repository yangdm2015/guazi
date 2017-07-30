/**
 * Created by Shan on 2017/7/23.
 */
var https = require('https')
var http = require('http')
let Proxy = require('../models/Proxy')
function proxy ({host, port}) {
  var opt = {
    host,
    port,
    method: 'GET',// 这里是发送的方法
    path: 'https://www.baidu.com',     // 这里是访问的路径
    headers: {
      // 这里放期望发送出去的请求头
    }
  }
  // 以下是接受数据的代码
  var body = ''
  // console.log('in proxy')
  return new Promise(function (resolve, reject) {
    var req = http.request(opt, function (res) {
      // console.log('Got response: ' + res.statusCode)
      res.on('data', function (d) {
        // console.log('in data')
        body += d
      }).on('end', function () {
        // console.log(res.headers)
        // console.log(body)
        let validity = body.indexOf('百度一下')
        let proxy = new Proxy({
          code: 'SUCCESS',
          address: opt.host,
          port: opt.port,
          body,
          validity
        })
        proxy.save(err => {
          if (err) { console.log('err in save!, err = ', err) }
          resolve({
            code: 'SUCCESS',
            address: opt.host,
            port: opt.port,
            body
          })
        })
        // resolve({
        //   code: 'SUCCESS',
        //   address: opt.host,
        //   port: opt.port,
        //   body
        // })
      })

    }).on('error', function (e) {
      // console.log('Got error: ' + e)
      resolve({
        code: e.code,
        address: opt.host,
        port: opt.port,
        body: e.body
      })
    })
    // req.on('error', (e) => {
    //   console.error(`problem with request: ${e.message}`)
    //   console.log('Got error: ' + e)
    //   reject(body)
    // })
    req.end()
  }, e => {
    console.log('err in proxy! err = ', e)
  })
}
exports.proxy = proxy

