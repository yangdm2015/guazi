/**
 * Created by yangshan on 2017/7/4.
 */
function addZero (str) {
  str = '' + str
  str = str.length < 2 ? '0' + str : str
  return str
}
function timestamp (d) {
  let date = d || new Date()
  if (date instanceof Date) {
    let year = date.getFullYear()
    let month = 1 + date.getMonth()
    month = addZero(month)
    let day = date.getDate()
    day = addZero(day)
    let hour = date.getHours()
    hour = addZero(hour)
    let minute = date.getMinutes()
    minute = addZero(minute)
    let second = date.getSeconds()
    second = addZero(second)
    let formatedate = '' + year + month + day + hour + minute + second
    return formatedate
  }
  return date
}
export default timestamp
