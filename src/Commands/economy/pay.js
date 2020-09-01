const Command = require('../../Structures/Command');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['pay'],
			category: 'economy'
		});
	}
	async run(message,language,args) {
        try {
            let member =  message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first() || message.guild.members.cache.get(args[3]));
            if(!member) return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.pay.params.param1))
            if(!args[1]) return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.pay.params.param2))
            if(args[1] < 1) return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.pay.params.param3))
            if(isNaN(args[1])) return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.pay.params.param4))
            let loc  = await this.Main.db.User.findOne({guildID: message.guild.id, userID: message.author.id})
            let data  = await this.Main.db.User.findOne({guildID: message.guild.id, userID: member.id})
            if(!data) return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.pay.params.param5.translate({member:member.user.tag})));
            if(loc.money < args[1]) return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.pay.params.param6));
            if(loc.userID == member.id) return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.pay.params.param7));
            if(member.user.bot) return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.pay.params8));
            loc.money -= Math.floor(parseInt(args[1]));
            data.money += Math.floor(parseInt(args[1]));
            loc.save(); data.save()
            message.channel.send(this.Main.embeds.OKEmbed.setDescription(language.pay.params.param9.translate({member:member.user.username,author:message.author.username,args1:args[1]})))
        } catch (error) {
            console.log(error.stack)
        }
    }
}