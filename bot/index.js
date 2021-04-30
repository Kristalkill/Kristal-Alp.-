const Main = new(require('./Structures/Main'))();
const dotenv = require('dotenv');
const {
  MessageEmbed
} = require('discord.js')
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
    let result = []
    for (let line of arr) {
      if (result.length == 0 || result[result.length - 1].length + line.length > len) {
        result.push(line)
      } else {
        result[result.length - 1] += line
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

function send(eror, promise) {
  let error = {
    message: eror.message || eror,
    path: eror.path || promise,
    name: eror.name,
    code: eror.code,
    method: eror.method
  };
  return Main.channels.cache.get('709749244931866669').send(new MessageEmbed().setDescription(`message: ${error.message}`).setTitle(error.name).setURL(error.path || promise).setTimestamp()
    .setFooter(error.code + error.method))
}
process.on('unhandledRejection', (reason, promise) => {
  send(reason, promise);
});
process.on('rejectionHandled', (promise) => {
  send(promise);
});
process.on('uncaughtException', (err, origin) => {
  send(err, origin);
});
process.on('uncaughtExceptionMonitor', (err, origin) => {
  let args = [err, origin]
  Main.channels.cache.get('709749244931866669').send(new MessageEmbed().setDescription(`message: ${args.map((arg) => JSON.parse(JSON.stringify(arg)))}`));
})
process.on('warning', (warning) => {
  send(warning)
});
setInterval(() => {
  console.warn(132)
}, 150000)