import request from '../utils/fetch.js'
import * as api from './frontend-api'
export function getCarList (params) {
  return new Promise(function (resolve, reject) {
    resolve(api.getCarList(params))
  })
}

