const Command = require('../../Structures/Command');
const Discord = require("discord.js-light");
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['sbot'],
			category: 'development',
      public: false
		});
	}
	async run(message) {
    try {
      let Exitembed = new Discord.MessageEmbed()
      .setTitle('Я успешно офнулся')
      .setDescription(`EMINEM-FRAMED`)
      message.channel.send(Exitembed)
       await process.exit()
    } catch (error) {
      console.log(error)
    }
}
}
