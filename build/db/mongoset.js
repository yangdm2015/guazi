var mongoose = require('mongoose')
var sprintf = require('sprintf-js').sprintf
let db
// var db = mongoose.createConnection()

var host, database, port, options, username, pswd
host = 'localhost'
database = 'ershouche'
port = 27017
/*port = 27019;*/
// username = 'test'
// pswd = 'test'
// var url = sprintf('mongodb://%s:%s@%s:%d/%s', username, pswd, host, port, database)
var url = sprintf('mongodb://%s:%d/%s', host, port, database)

module.exports = {
  db: mongoose.connection,
  init: function () {
    console.log('url=', url)
    db = mongoose.connect(url)
  }
}
