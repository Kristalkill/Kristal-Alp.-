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
  String.prototype.chunk = function(len){ 
     let arr = this.match(new RegExp("(?: *[^\\n]){0," + (len-1) + "}\\n|(?: *.){1," + len + "}", "g")).map(c=>c.replace(/^ +| +$/g, ''))
     let result = []
     for (let line of arr)
      result.length == 0
      ? result.push(line)
      : (result[result.length -1].length + line.length <  len
      ? result[result.length-1] += line
      : result.push(line)
  )
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