/**
 * Created by Shan on 2017/7/19.
 */
function rademTimeGen (base, times) {
  let rt = (Math.random() + 1) * base
  if (times % 10 === 0) {
    rt = rt * 10
  } else if (times % 12 === 0) {
    rt = rt * 3.2
  } else if (times % 3 === 0) {
    rt = rt * 2.7
  } else if (times % 15 === 0) {
    rt = rt * 5
  } else if (times % 6 === 0) {
    rt = rt * 2
  } else if (times % 17 === 0) {
    rt = rt * 1.5
  } else if (times % 26 === 0) {
    rt = rt * 4.3
  } else if (times % 37 === 0) {
    rt = rt * 3.9
  } else if (times % 48 === 0) {
    rt = rt * 2.2
  }
  rt = Math.floor(rt)
  return rt
}
exports.rademTimeGen = rademTimeGen
