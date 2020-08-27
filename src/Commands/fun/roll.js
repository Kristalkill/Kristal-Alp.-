const Discord = require('discord.js')
const Command = require('../../Structures/Command');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['roll'],
			category: 'fun'
		});
	}
	run(message,language,args) {
        try{    
            if(args[0] && args[1]){
                num1 = this.Main.utilss.toNum(args[0])
                num2 = this.Main.utilss.toNum(args[1])
            }
            let random = Math.floor(Math.random() * (num2 - num1)) + num1
            if(random > 9999999)return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.roll.params.param1))
            const embed = new Discord.MessageEmbed()
            .setColor("#70FF0D")
            .setTitle(language.roll.params.param2.translate({num1:num1,num2:num2,random:random}))
        message.channel.send(embed)
}catch(error){
console.log(error)
}
}
}
