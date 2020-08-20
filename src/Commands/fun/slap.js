const Discord = require('discord.js')
const Command = require('../../Structures/Command');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['slap'],
			description: 'slap',
			category: 'fun'
		});
	}
	async run(message,args) {
      try{
              let user = message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first() || message.guild.members.cache.get(args[0]));
              if (!user) return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription('Укажите пользователя'));
              const embed = new Discord.MessageEmbed()
            .setColor("#FF30A2")
            .setTitle(`${message.author.username} ударил(а) ${message.mentions.users.first().username}`)
            .setImage(await(require(`node-fetch`)(`https://nekos.life/api/v2/img/slap`)).then(r => r.json()).then(r => r.url))
            .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(embed)
}catch(error){
  console.log(error)
}
}
}