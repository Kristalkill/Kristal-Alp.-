const Command = require('../../Structures/Command');
const Discord = require("discord.js-light");
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['pat'],
			category: 'fun'
		});
	}
	async run(message,language,args) {
  try {
    let member =  message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first() || message.guild.members.cache.get(args[0]));
    if(!member)return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.nomember))
    const embed = new Discord.MessageEmbed()
    .setTitle(language.kiss.param.translate({member1:message.author.username,member2:member.user.username}))
    .setImage(await(require(`node-fetch`)(`https://nekos.life/api/v2/img/pat`)).then(r => r.json()).then(r => r.url))
    .setColor("#FF30A2")
    message.channel.send(embed)
  } catch (error) {
  console.log(error)
  }
}
}
