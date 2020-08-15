const Command = require('../../Structures/Command');
const Discord = require('discord.js')
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['ping'],
			description: 'ping',
			category: 'fun'
		});
	}
	run(message) {
  try {
    let embed = new Discord.MessageEmbed()
    .setColor('FFA947')
    .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    .setTitle(`🏓 Pong!`)
    .addField(`PINGs:`, `Discord API:${new Date().getTime() - message.createdTimestamp + 'ms'}\nPing:${Math.round(this.Main.ws.ping)}ms.`)
message.channel.send(embed);
}catch (error) {
    console.log(error)}
}
}
