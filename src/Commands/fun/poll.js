const Command = require('../../Structures/Command');
const Discord = require('discord.js');
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
             const language = require(`../../languages/${message.guild.settings.Moderation.language ||"en"}.json`);

        let embed = new Discord.MessageEmbed()
        .setTitle(language.poll.params.param1)
        .setFooter(message.author.tag)
        if (!args) return message.reply(this.Main.embeds.ErrEmbed.setDescription(language.poll.params.param2))
        const pollTopic = await message.channel.send(embed.setDescription(args.join(' ')));
        await pollTopic.react(`✅`);
        await pollTopic.react(`⛔`);
    }catch(err){
    console.log(err)
    }
}
}