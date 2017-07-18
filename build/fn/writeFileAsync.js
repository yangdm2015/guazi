/**
 * Created by Shan on 2017/7/19.
 */
let fs = require('fs')
function writeFileAsync (fileName, obj) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, JSON.stringify(obj), function (err) {
      if (err) {
        console.log('err = ', err)
        reject(err)
      }
      resolve('ok')
    })
  })
}
exports.writeFileAsync = writeFileAsync
