const Command = require('../../Structures/Command');
const Discord = require('discord.js');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['cat'],
			category: 'fun'
		});
	}
	async run(message) {
    try {
      const embed = new Discord.MessageEmbed()
      .setColor("#FF30A2")
      .setImage(await (require(`node-fetch`)(`https://api.thecatapi.com/v1/images/search`)).then(r => r.json()).then(r => r.url))
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      message.channel.send(embed)
    } catch (error) {
      console.log(error)
    }}}
