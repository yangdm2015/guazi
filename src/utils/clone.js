export default function clone (obj) {
  let str
  let newobj = obj.constructor === Array ? [] : {}
  if (typeof obj !== 'object') {
    return obj
  } else if (window.JSON) {
    str = JSON.stringify(obj)
    newobj = JSON.parse(str)
  } else {
    for (let i in obj) {
      newobj[i] = typeof obj[i] === 'object' ? clone(obj[i]) : obj[i]
    }
  }
  return newobj
}
