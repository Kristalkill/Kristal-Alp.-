const Command = require('../../Structures/Command');
const Discord = require('discord.js')
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['avatar'],
			category: 'fun'
		});
	}
	async run(message,language) {
    try {
      let user = message.mentions.users.first() ? message.mentions.users.first() : message.author;
      let AvatarEmbed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle(`${language.avatar.params.param1} ${user.username}!`)
          .setImage(user.avatarURL({dynamic: true}))
      await message.channel.send(AvatarEmbed)
    } catch (error) {
      console.log(error)
    }}}
