const Discord = require('discord.js')
const Command = require('../../Structures/Command');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['reverse'],
			category: 'fun'
		});
	}
	run(message,language,args) {
  try{
      if(!args)return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription('Введите что-то'));
      let aembed = new Discord.MessageEmbed()
      .setTitle("Перевёрнуто успешно")
      .setDescription(args.join(' ').split('').reverse().join(''));
      message.channel.send(aembed);
}catch(error){
  console.log(error)
}
}
}