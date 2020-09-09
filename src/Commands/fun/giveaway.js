const Command = require('../../Structures/Command');
const Discord = require('discord.js');
const ms = require('ms')
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['giveaway'],
			category: 'fun'
		});
	}
	async run(message,language,args) {
try {   
    let messageid = args[1];
    if(!args[0])return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.giveaway.params.param1))
    switch(args[0].toLowerCase()){
        case "add":
            try {
                let Duration = args[1];
                let Prize = args.slice(3).join(' ');
                let Winners = args[2];
                if(!Duration)return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.giveaway.params.param2));
                if(!parseInt(Winners))return message.channel.send(language.giveaway.params.param3);
                if(!Prize)return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.giveaway.params.param3));
                const embed  = new Discord.MessageEmbed()
                    .setTitle(`🎉**${language.giveaway.params.param4}** 🎉`)
                    .setDescription(language.giveaway.params.param6.translate({Prize:Prize,Duration:Duration,Winners:Winners}))
                    .setFooter(this.Main.user.tag)
                message.channel.send(embed).then(message => {
                    message.react('🎉');
                    this.Main.db.Giveaway.create({guildID:message.guild.id,time:Date.now() + ms(Duration),prize:Prize,winners:Winners,messageID:message.id,channel:message.channel.id})
                })
                break;
            }catch (error) {
                console.log(error)  
            }
        case "end":
             try {
                    const GiveAway  = new Discord.MessageEmbed()
                    .setTitle(`**🎉${language.giveaway.params.param7}🎉**`)
                    if(message.guild.settings){
                        let userees = await message.guild.channels.cache.get(message.guild.settings.channel).messages.fetch(message.guild.settings.messageID).then((v) => Array.from(v.reactions.cache.get("🎉").users.cache.filter(user => user.id != this.Main.user.id && !user.bot).keys()));
                        if(userees.length){
                        let random = [];
                        random = userees.shuffle().slice(0, message.guild.settings.winners);
                        message.guild.channels.cache.get(message.guild.settings.channel).send(GiveAway.setDescription(`${language.giveaway.params.param8} ${random.map(a => message.guild.members.cache.get(a)).join(', ')}`));
                    }else{
                        GiveAway.setDescription(language.giveaway.params.param9)
                    }
                    message.guild.channels.cache.get(message.guild.settings.channel).send(GiveAway)
                    await this.Main.db.Giveaway.deleteOne({guildID:message.guild.settings.guildID,time:message.guild.settings.time,prize:message.guild.settings.prize,winners:message.guild.settings.winners,messageID:message.guild.settings.messageID,channel:message.guild.settings.channel});
                    }else return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.giveaway.params.param10));       
            } catch (error) {
                console.log(error)
            }
        break;
        case "delete":
            try {
                if(message.guild.settings){
                    await this.Main.db.Giveaway.deleteOne({guildID:message.guild.settings.guildID,time:message.guild.settings.time,prize:message.guild.settings.prize,winners:message.guild.settings.winners,messageID:message.guild.settings.messageID,channel:message.guild.settings.channel})
                    message.channel.send(this.Main.embeds.OKEmbed.setDescription(language.giveaway.params.param11.translate({id:message.guild.settings.messageID})));
                }else return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.giveaway.params.param10));
                break;
            }catch (error) {
                console.log(error)   
            }
        }
} catch (error) {
    console.log(error)    
}}}
