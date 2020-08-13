module.exports = {
  name: 'eval',
  description: 'eval',
  aliases: ["e"],
  public: false,
  async execute(Main, message, args) {
    let argss = args.join(' ')
    try {
      let evaled = await eval(argss)
      const tyype = typeof evaled[0].toUpperCase() + typeof evaled.slice(1);
      if(typeof evaled!== 'string') evaled = require('util').inspect(evaled, {depth: 0});
      evaled == (undefined || null) ? evaled = 'Empty response: ' + evaled : evaled;
      for(i= 2048;i <= evaled.match(/.{1,1024}/g);i * 2){
        let evaled = await eval(argss).match(/.{1,i}/g);
        embed[i] = new Discord.MessageEmbed();
        message.channel.send(embed[i].setDescription(`\`\`\`${evaled}\`\`\``))
      }
      if(evaled.substr().length >= 1024 ){
        
      }
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
