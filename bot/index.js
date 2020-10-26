const Main = new(require('./Structures/Main'))();
const dotenv = require('dotenv');
dotenv.config();
try {
  String.prototype.translate = function(vars) {
    let str = this;
    for (const [KEY, value] of Object.entries(vars)) {
      str = str.replace(new RegExp(`%${KEY}%`, 'g'), value);
    }
    return str;
  };
  String.prototype.chunk = function(len) {
    const arr = this.match(
      new RegExp(`(?: *[^\\n]){0,${len - 1}}\\n|(?: *.){1,${len}}`, 'g')
    ).map((c) => c.replace(/^ +| +$/g, ''));
    let result = [];
    for (const line of arr) {
      let resute = result[result.length - 1]
      if (result.length === 0 || resute.length + line.length < len) {
        result.push
      } else {
        resute += line
      }
    }
    return result;
  };
  String.prototype.capitalize = function() {
    return this.replace(/^./, (match) => match.toUpperCase());
  };
  Array.prototype.shuffle = function() {
    return this.sort(() => Math.random() - 0.5);
  };
  String.prototype.clear = function() {
    return this.normalize('NFD')
      .replace(
        /[^\p{Letter}\p{Number}]/gu, //\p{Emoji_Modifier_Base}\p{Emoji_Modifier}\p{Emoji_Presentation}\p{Emoji}\uFE0F <>:
        ''
      )
    //.capitalize();
  };
} catch (err) {
  console.log(err);
}
Main.start();