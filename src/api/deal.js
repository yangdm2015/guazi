import * as api from './frontend-api'
export function getDealList (params) {
  return new Promise(function (resolve, reject) {
    resolve(api.getDealList(params))
  })
  // return request({
  //   url: `/api/dealList`,
  //   method: 'GET',
  //   params: params
  // })
}
export function getDealDetail (id) {
  return new Promise(function (resolve, reject) {
    resolve(api.getDealDetail(id))
  })
  // return request({
  //   url: `/api/dealDetail/${id}`,
  //   method: 'GET',
  //   params: {}
  // })
}
export function getDealFieldsList (dealId, agreementId) {
  return new Promise(function (resolve, reject) {
    resolve(api.getDealFieldList(dealId, agreementId))
  })
  // return request({
  //   url: `/api/dealFieldList/${dealId}/${agreementId}`,
  //   method: 'GET',
  //   params: {}
  // })
}
