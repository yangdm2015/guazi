/**
 * Created by yangshan on 2017/7/8.
 */
function getMarkerId (section) {
  let rangeInfo = section.rangeInfos[0]
  let {endMarkerId, startMarkerId} = rangeInfo
  return {endMarkerId, startMarkerId}
}
function entityIsEmpty (entity) {
  let isEmpty = false
  if (!entity.highLight || !entity.propertyName || !entity.type) {
    isEmpty = true
  }
  return isEmpty
}

function getHeight (field) {
  let startMarkerId = field.markerId.startMarkerId
  let node = document.querySelector('#' + startMarkerId)
  let p = node.parentNode
  return p.offsetTop
}

export {
  getMarkerId, entityIsEmpty, getHeight
}
