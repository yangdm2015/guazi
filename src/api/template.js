import * as api from './frontend-api'

export function getTemplateList () {
  // return api.getTemplateList();
  return new Promise(function (resolve, reject) {
    resolve(api.getTemplateList())
  })
}
export function getTemplateDetail (id) {
  return new Promise(function (resolve, reject) {
    resolve(api.getTemplateDetail(id))
  })
  // return request({
  //   url: `/api/templateDetail/${id}`,
  //   method: 'GET',
  //   params: {}
  // })
}
// export function saveTemplate (contract) {
//   return request({
//     url: `/api/templateSave`,
//     method: 'POST',
//     data: contract
//   })
// }
export function getAgreementDetail (templateId, agreementId) {
  return new Promise(function (resolve, reject) {
    resolve(api.getTemplateDetail(templateId, agreementId))
  })
  // return request({
  //   url: `/api/templateAgreementDetail/${templateId}/${agreementId}`,
  //   method: 'GET',
  //   params: {}
  // })
}
export function getAgreementFieldsList (templateId, agreementId) {
  return new Promise(function (resolve, reject) {
    resolve(api.getTemplateFieldList(templateId, agreementId))
  })
}
export function saveAgreement (templateId, agreementId, agreement) {
  return new Promise(function (resolve, reject) {
    resolve(api.templateAgreementSave(templateId, agreementId, agreement))
  })
}
