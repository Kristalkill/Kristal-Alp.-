const Command = require('../../Structures/Command');
const Discord = require('discord.js')
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['poll'],
                        category: 'fun',
                        Permission:["ADMINISTRATOR"]
		});
	}
	async run(message,args) {
try{
        let embed = new Discord.MessageEmbed()
.setTitle(`ГОЛОСОВАНИЕ`)
.setFooter(message.author.tag)
        if (!args) return message.reply(this.Main.embeds.ErrEmbed.setDescription("Напишите за что голосовать!"))
        const pollTopic = await message.channel.send(embed.setDescription(args.join(' ')));
        await pollTopic.react(`✅`);
        await pollTopic.react(`⛔`);
    }catch(err){
    console.log(err)
    }
}
}