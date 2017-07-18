/**
 * Created by yangshan on 2017/7/18.
 */
let brandList = require('../../bl.json')
function getCarBrandId (car) {
  let title = car.title
  let brandId
  for (let i in brandList) {
    let item = brandList[i]
    let result = title.match(item.big_ppname)
    if (result) {
      console.log('result = ', result)
      if (result && result.length) {
        console.log('item.id = ', item.id)
        brandId = item.id
        break
      }
    }
  }
  return brandId
}
exports.getCarBrandId = getCarBrandId

