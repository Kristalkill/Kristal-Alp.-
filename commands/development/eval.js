module.exports = {
  name: 'eval',
  description: 'eval',
  aliases: ["e"],
  public: false,
  async execute(Main, message, args) {
    if (!config.owner.includes(message.author.id))return message.channel.send('Ти не овнер а гавно')
    let argss = args.join(' ')
    try {
      let evaled = await eval(argss);
      let eevaled = typeof evaled;
      const tyype = eevaled[0].toUpperCase() + eevaled.slice(1);
      if(typeof evaled!== 'string') evaled = require('util').inspect(evaled, {depth: 0});
      evaled == (undefined || null) ? evaled = 'Empty response: ' + evaled : evaled;
let embed = new Discord.MessageEmbed()
.addField('Вход',`\`\`\`js\n${argss}\`\`\``)
.addField('Выход',`\`\`\`js\nType: ${tyype}\nDone for: ${new Date().getTime() - message.createdTimestamp + 'ms'}\n${evaled}\`\`\``,true)
message.channel.send(embed).then((embed) => message.react("✅"))
} catch(err) {
let embed = new Discord.MessageEmbed()
.addField('Вход',`${argss}`)
.addField('Выход',`\`\`\`js\nError ❎\n${err}\`\`\``,true);
message.channel.send(embed).then(() => message.react("❎"))}
}
};
