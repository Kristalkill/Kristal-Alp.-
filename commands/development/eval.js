const util = require('util')
module.exports = {
  name: 'eval',
  description: 'eval',
  aliases: ["e"],
  public: true,
  async execute(Main, message, args) {
    if (!config.owner.includes(message.author.id))return message.channel.send('Ти не овнер а гавно')
    try {
let evaled = eval(args.join(' '));
if (evaled instanceof Promise || (Boolean(evaled) && typeof evaled.then === 'function' && typeof evaled.catch === 'function')) evaled = await evaled
if(evaled == `[object Object]`)evaled = await `${args}:\n${util.inspect(evaled)}`
let eevaled = typeof evaled;
let tyype = eevaled[0].toUpperCase() + eevaled.slice(1)
if(evaled === `undefined`) evaled = `Undefined`
let embed = new Discord.MessageEmbed()
.addField('Вход',`${args}`)
.addField('Выход',`\`\`\`\njs\nType: ${tyype}\nDone for: ${new Date().getTime() - message.createdTimestamp + 'ms'}\n${evaled}\`\`\``,true)
message.channel.send(embed).then((embed) => message.react("✅"))
} catch(err) {
message.channel.send(`Error ❎
\n${err}`, {code: "js", split: "\n"}).then(() => message.react("❎"))}
}
};
