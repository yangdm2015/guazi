/**
 * Created by Shan on 2017/7/21.
 */
function sumarySurvive (car) {
  let m = +car.mileage < 4.9
  let noWuling = car.title.indexOf('五菱') === -1
  let noJinbei = car.title.indexOf('金杯') === -1
  // let l = car.location === '北京'
  let p = +car.price < 8.5
  if (m && noWuling && p && noJinbei) {
    return true
  }
  return false
}
exports.sumarySurvive = sumarySurvive
