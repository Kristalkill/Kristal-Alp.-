const Command = require('../../Structures/Command');
const Discord = require('discord.js')
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['pat'],
			description: 'pat',
			category: 'fun'
		});
	}
	async run(message,args) {
  try {
    let user = message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first()  || message.guild.members.cache.get(args[0]));
    if (!user) return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription('Укажите пользователя'));
    const embed = new Discord.MessageEmbed()
    .setImage(await(require(`node-fetch`)(`https://nekos.life/api/v2/img/pat`)).then(r => r.json()).then(r => r.url))
    .setColor("#FF30A2")
    .setTitle(`${message.author.username} гладит ${message.mentions.users.first().username}`)
    message.channel.send(embed)
  } catch (error) {
  console.log(error)
  }
}
}
