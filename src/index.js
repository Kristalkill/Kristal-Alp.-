const client = require('./Structures/Main');
const config = require('../config.json');
const mongoose = require("mongoose");
const Main = new client(config);
String.prototype.translate = function(vars){
    var str = this;
    for (const [KEY, value] of Object.entries(vars)) {
      str = str.replace(new RegExp(`%${KEY}%`, 'g'), value);
    }
    return str;
  }
  String.prototype.chunk = function(length) {
    return this.match(new RegExp('[^]{1,' + +length + '}', 'g'));
  }
  String.prototype.chunk2 =  function(length) {
    return  this.split(new RegExp('[^]{1,' + +length + '}', 'g'));
  }
try {
    mongoose.connect(config.dataURL, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('connected',()=>{
      console.log('[✅DataBase] Connected!')
})
}catch(err){
    console.log(err)
}
Main.start();