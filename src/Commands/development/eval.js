const Command = require('../../Structures/Command');
const Discord = require('discord.js')
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['e'],
			description: 'Eval',
			category: 'development'
		});
	}
	async run(message,args) {
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
      evaled.chunk(1000).forEach(chunk => {
        embed.addField(`** **`,`\`\`\`js\n${chunk}\`\`\``)
      });
      message.channel.send(embed).then(() => message.react("✅"))
}catch(err) {
let embed = new Discord.MessageEmbed()
.addField('Вход',`${argss}`)
.addField('Выход',`\`\`\`js\nError ❎\n${err}\`\`\``,true);
message.channel.send(embed).then(() => message.react("❎"))}
}
};
