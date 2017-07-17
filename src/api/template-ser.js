import request from '../utils/fetch.js'

export function getTemplateList () {
  return request({
    url: '/api/templateList',
    method: 'GET',
    params: {}
  })
}
export function getTemplateDetail (id) {
  return request({
    url: `/api/templateDetail/${id}`,
    method: 'GET',
    params: {}
  })
}
export function saveTemplate (contract) {
  return request({
    url: `/api/templateSave`,
    method: 'POST',
    data: contract
  })
}
export function getAgreementDetail (templateId, agreementId) {
  return request({
    url: `/api/templateAgreementDetail/${templateId}/${agreementId}`,
    method: 'GET',
    params: {}
  })
}
export function getAgreementFieldsList (templateId, agreementId) {
  return request({
    url: `/api/templateFieldList/${templateId}/${agreementId}`,
    method: 'GET',
    params: {}
  })
}
export function saveAgreement (templateId, agreementId, agreement) {
  return request({
    url: `/api/templateAgreementSave/${templateId}/${agreementId}`,
    method: 'POST',
    data: agreement
  })
}
