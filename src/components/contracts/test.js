/**
 * Created by yangshan on 2017/6/29.
 */

(function () {
  console.log('in test, this = ', this)

  let obj = {}
  require.call(obj, './rangy')
})()
