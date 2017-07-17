/**
 * Created by Shan on 2017/7/15.
 */
let Promise = require("bluebird");
let carsJsongen = require('./genCarsInfoJson').carsJsongen

function crawler() {
  carsJsongen()
}
exports.crawler = crawler;
