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
String.prototype.chunk = function(len) {
  let result = [], curr_chunk = "", counter = 0;

  for (let char of this) {
    switch (char) {
      case " ": // Пробел? Добавляет в текущую строку, ничего больше не делая
        curr_chunk += " ";
        break;

      case "\n": // Перенос строки? Считает как отдельный chunk + сбрасывает счетчики
        push_n_reset(curr_chunk + "\n");
        break;

      default: // Любой другой символ
        curr_chunk += char; // +символ к текущей строке, увеличивает счетчик
        if (++counter == len) push_n_reset(curr_chunk); // Дошел до len? push!
    }
  }
  
  if (curr_chunk) result.push(curr_chunk); // Остался кусок строки после перебора.
  
  return result;

  /***/
  function push_n_reset(chunk) {
    result.push(chunk);
    curr_chunk = "";
    counter = 0;
  }
};
  String.prototype.chunk2 = function(len){ 
     return this.match(new RegExp("(?: *[^\\n]){0," + (len-1) + "}\\n|(?: *.){1," + len + "}", "g")).map(c=>c.replace(/^ +| +$/g, ''))
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