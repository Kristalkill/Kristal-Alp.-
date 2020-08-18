const Discord = require('discord.js')
const Command = require('../../Structures/Command');
const fetch = require("node-fetch")
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['ss'],
			description: 'ss',
			category: 'fun'
		});
	}
	run(message,args) {
  try{
        this.Main.db.Guild.findOne({guildID: message.guild.id} , async(err,res) => {
          if(err)return console.log(err);
        if(!args[0]) return message.channel.send(this.embeds.ErrEmbed.setDescription(`А ссылку забув :?\nПример использования **${res.Moderation.prefix}ss google.com**`))
        await fetch(`https://chromechain.herokuapp.com/?url=${args[0]}`)
          .then(res => res.json())
          .then(body => {
            if(!body) return;
           let embed = new Discord.MessageEmbed()
           .setTitle('Скриншот')
           .setDescription(args[0])
           .setImage(body.content)
           message.channel.send(embed)
})
})
}catch(error){
  console.log(error)
}
}
}
