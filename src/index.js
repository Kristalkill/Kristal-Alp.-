const client = require('./Structures/Main');
const config = require('../config.json');
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Main = new client(process.env);
try {
String.prototype.translate = function(vars){
    var str = this;
    for (const [KEY, value] of Object.entries(vars)) {
      str = str.replace(new RegExp(`%${KEY}%`, 'g'), value);
    }
    return str;
  }
  String.prototype.chunk = function(length) {
    let result = []
    let lines = this.trim().match(new RegExp('[^]{1,' + +length+ '}', 'g')).filter(x => x);
      for (let line of lines){
      result.push(line)
      }
    return result
    }
  String.prototype.capitalize = function () {
    return this.replace(/^./, function (match) {
      return match.toUpperCase();
    });
  };
  Array.prototype.shuffle = function () {
    return this.sort(() => Math.random() - 0.5);
  }
    mongoose.connect(config.dataURL, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('connected',()=>{
      console.log('[✅DataBase] Connected!')
})
}catch(err){
    console.log(err)
}
Main.start();