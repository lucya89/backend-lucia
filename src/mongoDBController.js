var mongoose = require('mongoose');

module.exports.connect = function() {
  mongoose.connect('mongodb://localhost:27017/user-curso')
  var db = mongoose.connection
  db.on("error", console.error.bind(console, "error de conexión"))
  db.once("open", function(callback) {
    console.log("Conexión exitosa")
  })
  return db
}