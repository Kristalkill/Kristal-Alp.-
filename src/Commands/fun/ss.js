const Discord = require("discord.js-light");
const Command = require('../../Structures/Command');
const fetch = require("node-fetch")
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['ss'],
			category: 'fun'
		});
	}
	async run(message,language,args) {
  try{
        if(!args[0]) return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.ss.params.param1))
        await fetch(`https://chromechain.herokuapp.com/?url=${args[0]}`)
          .then(res => res.json())
          .then(body => {
          if(!body) return;
           let embed = new Discord.MessageEmbed()
           .setTitle(language.ss.params.param2)
           .setDescription(args[0])
           .setImage(body.content)
           message.channel.send(embed)
})
}catch(error){
  console.log(error)
}
}
}
