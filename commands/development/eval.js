module.exports = {
  name: 'eval',
  description: 'eval',
  aliases: ["e"],
  public: false,
  async execute(Main, message, args) {
    let argss = args.join(' ')
    try {
      let evaled = await eval(argss);
      let eevaled = typeof evaled;
      const tyype = eevaled[0].toUpperCase() + eevaled.slice(1);
      if(typeof evaled!== 'string') evaled = require('util').inspect(evaled, {depth: 0});
      evaled == (undefined || null) ? evaled = 'Empty response: ' + evaled : evaled;
      let embed = new Discord.MessageEmbed()
      .addField('Вход',`\`\`\`js\n${argss}\`\`\``)
      .addField('Выход',`\`\`\`js\nType: ${tyype}\nDone for: ${new Date().getTime() - message.createdTimestamp + 'ms'}\`\`\``,true)
      message.channel.send(embed)
      for(i= 1;i <= evaled.match(/.{1,1024}/g).length;i++){
        let o = 1024
        let evaled = evaled.match(/.{1,o}/g);
        o + 1024;
        embed[i] = new Discord.MessageEmbed();
        message.channel.send(embed[i].setDescription(`\`\`\`${evaled}\`\`\``))
      }
      message.react("✅")
}catch(err) {
let embed = new Discord.MessageEmbed()
.addField('Вход',`${argss}`)
.addField('Выход',`\`\`\`js\nError ❎\n${err}\`\`\``,true);
message.channel.send(embed).then(() => message.react("❎"))}
}
};
