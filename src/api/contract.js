import request from '../utils/fetch.js'
import * as api from './frontend-api'
export function getContractList (params) {
  return new Promise(function (resolve, reject) {
    resolve(api.getContractList(params))
  })
  // return request({
  //   url: '/api/contractList',
  //   method: 'GET',
  //   params: params
  // })
}
export function getContractDetail (id) {
  console.log('id = ', id)
  return new Promise(function (resolve, reject) {
    resolve(api.getContractDetail(id))
  })
  // return request({
  //   url: `/api/contractDetail/${id}`,
  //   method: 'GET',
  //   params: {}
  // })
}
export function getAgreementDetail (contractId, agreementId) {
  return request({
    url: `/api/agreementDetail/${contractId}/${agreementId}`,
    method: 'GET',
    params: {}
  })
}
export function saveContract (contract) {
  return request({
    url: `/api/contractSave`,
    method: 'POST',
    data: contract
  })
}
export function saveAgreement (contractId, agreementId, agreement) {
  return request({
    url: `/api/agreementSave/${contractId}/${agreementId}`,
    method: 'POST',
    data: agreement
  })
}
export function getAgreementFieldsList (contractId, agreementId) {
  return new Promise(function (resolve, reject) {
    resolve(api.getContractFieldList(contractId, agreementId))
  })
  // return request({
  //   url: `/api/contractFieldList/${contractId}/${agreementId}`,
  //   method: 'GET',
  //   params: {}
  // })
}

export function getContractFieldsList (contractId, agreementId) {
  return new Promise(function (resolve, reject) {
    resolve(api.getContractFieldList(contractId, agreementId))
  })
  // return request({
  //   url: `/api/contractFieldList/${contractId}/${agreementId}`,
  //   method: 'GET',
  //   params: {}
  // })
}
