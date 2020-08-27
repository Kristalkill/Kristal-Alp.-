const Command = require('../../Structures/Command');
module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['ban'],
            category: 'moder',
            Permission:["BAN_MEMBERS"],
            PermissionBOT:["BAN_MEMBERS"],
		});
	}
	run(message,language,args) {
        try {
            let member =  message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first()  || message.guild.members.cache.get(args[0]))
if(member.bannable === true){
if(!member)return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.nomember))
let days = parseInt(args[2])||Infinity
let reason = args[1]||language.undefined
member.ban({ days: days, reason: reason })
message.channel.send(this.Main.embeds.OKEmbed.setDescription(language.ban.params.param1.translate({name:member.user.name,days:days,reason:reason})))
}
else return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.ban.params.param2))
        } catch (error) {
            console.log(error)
        }
}
}