/**
 * Created by Shan on 2017/7/19.
 */
function rademTimeGen (base, times) {
  let rt = Math.floor(Math.random() * base)
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
  }
  return rt
}
exports.rademTimeGen = rademTimeGen
