/**
 * Created by yangshan on 2017/7/6.
 */

var carsInfoList = require('../static-data/car-info.json')
// let templateData = require('../../static/template/templateData.json')
// let contractList = appData.contractList
// let templateList = templateData.templateList
// let dealList = appData.dealList
// var agreementFieldsList = []
// let agreementFieldsListIsChanged = false

let getCarList = function (params) {
  return {
    data: {
      errno: 0,
      data: carsInfoList
    }
  }
}
export {
  getCarList
}
