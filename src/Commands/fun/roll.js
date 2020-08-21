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
            if(random > 9999999)return message.channel.send(this.Main.embeds.ErrEmbed.setDescription("Введите числа поменьше"))
            const embed = new Discord.MessageEmbed()
            .setColor("#70FF0D")
            .setTitle(`Из чисел ${num1} до ${num2},вам выпало : ${random}`)
        message.channel.send(embed)
}catch(error){
console.log(error)
}
}
}
