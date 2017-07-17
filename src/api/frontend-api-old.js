/**
 * Created by yangshan on 2017/7/6.
 */

var appData = require('../../data.json')
let templateData = require('../../static/template/templateData.json')
let contractList = appData.contractList
let templateList = templateData.templateList
let dealList = appData.dealList
var agreementFieldsList = []
// let agreementFieldsListIsChanged = false

let getTemplateList = function (req, res) {
  return {
    data: {
      errno: 0,
      data: templateList
    }
  }
  // res.json({
  //   errno: 0,
  //   data: templateList
  // })
}
let getTemplateDetail = function (id) {
  let template = templateList.find(it => { return it.id === +id })
  return {
    data: {
      errno: 0,
      data: template
    }
  }
}
let getTemplateAgreementDetail = function (templateId, agreementId) {
  let agreement = getAgreement(templateList, templateId, agreementId)
  return {
    data: {
      errno: 0,
      data: agreement
    }
  }
}
let getTemplateFieldList = function (templateId, agreementId) {
  // console.log('templateId = ', templateId, '  agreementId = ', agreementId)
  agreementFieldsList = getAgreementFields(templateList, templateId, agreementId)
  return {
    data: {
      errno: 0,
      data: agreementFieldsList
    }
  }
}

let getContractList = function (params) {
  let query = params
  let list = []
  if (query && query !== {} && query.productType) {
    list = contractList.filter(item => { return item.productType === query.productType })
  } else {
    list = contractList
  }
  return {
    data: {
      errno: 0,
      data: list
    }
  }
}
let getContractDetail = function (id) {
  let contract = templateList.find(it => { return it.id === +id })
  return {
    data: {
      errno: 0,
      data: contract
    }
  }
}
let getAgreementDetail = function (req, res) {
  let contractId = req.params.contractId
  let agreementId = req.params.agreementId
  let agreement = getAgreement(contractList, contractId, agreementId)
  res.json({
    errno: 0,
    data: agreement
  })
}
let getContractFieldList = function (contractId, agreementId) {
  // let contractId = req.params.contractId
  // let agreementId = req.params.agreementId
  // console.log('contractId = ', contractId, '  agreementId = ', agreementId)
  // console.log('agreementFieldsListIsChanged = ', agreementFieldsListIsChanged)
  // if (!agreementFieldsListIsChanged) {
  //   agreementFieldsList = getAgreementFields(templateList, contractId, agreementId)
  // }
  // res.json({
  //   errno: 0,
  //   data: agreementFieldsList
  // })
  // console.log('contractList = ',contractList)
  agreementFieldsList = getAgreementFields(contractList, contractId, agreementId)
  return {
    data: {
      errno: 0,
      data: agreementFieldsList
    }
  }
}
let contractSave = function (req, res) {
  console.log(req.body)
  // let contractId = req.body.id
  // let contract = req.body
  // let contractIndex = contractList.indexOf(contractList.find(it => { return it.id === contractId }))
  // appData.contractList[contractIndex] = contract
  // var t = JSON.stringify(appData)
  // fs.writeFile('data.json', t, ( err, data) => {
  //   res.json({
  //     errno: 0,
  //     data: contract
  //   })
  // })
}
let agreementSave = function (req, res) {
  console.log(req.body)
  // let contractId = req.params.contractId
  // let agreementId = req.params.agreementId
  // agreementFieldsList = req.body.agreementFields
  // let mainAgreement = req.body.mainAgreement
  // var afl = JSON.stringify(agreementFieldsList)
  // console.log('getAgreementSrc(contractId, agreementId) = ', getAgreementSrc(contractList, contractId, agreementId))
  // fs.writeFile('static/' + getAgreementSrc(contractList, contractId, agreementId), mainAgreement, (err, data) => {
  //   fs.writeFile('static/' + getAgreementFieldsSrc(contractList, contractId, agreementId), afl, (err, data) => {})
  //   console.log('ok!')
  //   agreementFieldsListIsChanged = true
  //   res.json({
  //     errno: 0,
  //     data: 'ok'
  //   })
  // })
}
let templateAgreementSave = function (templateId, mainAgreement, agreement) {
  agreementFieldsList = agreement.agreementFields
  return {
    data: {
      errno: 0,
      data: mainAgreement
    }
  }
}
let getDealList = function (params) {
  let query = params
  let list = []
  if (query) {
    list = dealList.filter(item => { return item.productType === query.productType })
  } else {
    list = dealList
  }
  // console.log('dealList =', dealList)
  // console.log('list =', list)
  return {
    data: {
      errno: 0,
      data: list
    }
  }
}
let getDealDetail = function (id) {
  let deal = dealList.find(it => { return it.id === +id })
  return {
    data: {
      errno: 0,
      data: deal
    }
  }
}

let getDealFieldList = function (dealId, agreementId) {
  // console.log('dealId = ', dealId, '  agreementId = ', agreementId)
  let agreementFields = getAgreementFields(dealList, dealId, agreementId)
  return {
    data: {
      errno: 0,
      data: agreementFields
    }
  }
  // res.json({
  //   errno: 0,
  //   data: agreementFields
  // })
}

function getAgreement (list, contractId, agreementId) {
  let contract = list.find(it => {
    return it.id === +contractId
  })
  // console.log('list = ',list)
  // console.log('contract = ', contract)
  let agreement = contract.agreementList.find(it => { return it.id === +agreementId })
  // console.log('agreement = ', agreement)
  return agreement
}
function getAgreementFieldsSrc (list, contractId, agreementId) {
  let agreement = getAgreement(list, contractId, agreementId)
  let agreementFieldsSrc = agreement.agreementFieldsSrc
  return agreementFieldsSrc
}
// function getAgreementSrc (list, contractId, agreementId) {
//   let agreement = getAgreement(list, contractId, agreementId)
//   let agreementSrc = agreement.agreementSrc
//   return agreementSrc
// }

function getAgreementFields (list, contractId, agreementId) {
  // console.log('contractId = ',contractId)
  // console.log('agreementId = ',agreementId)
  let agreementFieldsSrc = getAgreementFieldsSrc(list, contractId, agreementId)
  // let agreementFields = []
  let agreementFields = require('../../static/' + agreementFieldsSrc)
  // console.log('agreementFieldsSrc = ', agreementFieldsSrc)
  // console.log('agreementFields = ', agreementFields)
  return agreementFields
}

export {
  getTemplateDetail, getContractList, getDealList, getTemplateList, getTemplateAgreementDetail,
  getAgreementDetail, getDealDetail, getContractDetail, getDealFieldList, getContractFieldList,
  getTemplateFieldList, contractSave, agreementSave, templateAgreementSave
}
