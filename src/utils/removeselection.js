function removeselection (MarkerId, className) {
  let {endMarkerId, startMarkerId} = MarkerId
  let startSpan = document.querySelector('#' + startMarkerId)
  if (startSpan) {
    let startSibling = startSpan.nextSibling
    let startParentNode = startSpan.parentNode
    startParentNode.removeChild(startSpan)
    if (startSibling.className && startSibling.className.indexOf(className) > -1) {
      startParentNode.replaceChild(document.createTextNode(startSibling.innerText), startSibling)
    }
  }
  let endSpan = document.querySelector('#' + endMarkerId)
  if (endSpan) {
    let endParentNode = endSpan.parentNode
    endParentNode.removeChild(endSpan)
    let endParentParentNode = endParentNode.parentNode
    endParentParentNode.replaceChild(document.createTextNode(endParentNode.innerText), endParentNode)
  }
}
function addbackground (MarkerId, className, fadeClassName) {
  let nodes = getRelatedNode(MarkerId, className)
  for (let n in nodes) {
    let item = nodes[n]
    fadeClass(item, fadeClassName)
  }
}

function fadeClass (node, fadeClassName) {
  if (node.className.indexOf(fadeClassName) === -1) {
    let tmp = node.className
    node.className = tmp + ' ' + fadeClassName
    setTimeout(function () {
      // console.log('in setTimeout, node =', node)
      node.className = tmp
      // console.log('node.className = ', node.className)
    }, 1000)
  }
}

function addListener (node, field) {
  node.addEventListener('mouseover', function (e) {
    // console.log('mouseover')
  })
}
function getRelatedNode (MarkerId, className) {
  let {endMarkerId, startMarkerId} = MarkerId
  let relatedNode = []
  let startSpan = document.querySelector('#' + startMarkerId)
  if (startSpan) {
    let startSibling = startSpan.nextSibling
    let startParentNode = startSpan.parentNode
    if (startSibling.className && startSibling.className.indexOf(className) > -1) {
      relatedNode.push(startSibling)
    }
    if (startParentNode.className && startParentNode.className.indexOf(className) > -1) {
      if (relatedNode.indexOf(startParentNode) === -1) {
        relatedNode.push(startParentNode)
      }
    }
  }
  let endSpan = document.querySelector('#' + endMarkerId)
  if (endSpan) {
    let endParentNode = endSpan.parentNode
    if (endParentNode.className && endParentNode.className.indexOf(className) > -1) {
      if (relatedNode.indexOf(endParentNode) === -1) {
        relatedNode.push(endParentNode)
      }
    }
  }
  return relatedNode
}

export { removeselection, addbackground, getRelatedNode, addListener }
