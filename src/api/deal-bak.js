import request from '../utils/fetch.js'

export function getDealList (params) {
  return request({
    url: `/api/dealList`,
    method: 'GET',
    params: params
  })
}
export function getDealDetail (id) {
  return request({
    url: `/api/dealDetail/${id}`,
    method: 'GET',
    params: {}
  })
}
export function getDealFieldsList (dealId, agreementId) {
  return request({
    url: `/api/dealFieldList/${dealId}/${agreementId}`,
    method: 'GET',
    params: {}
  })
}
