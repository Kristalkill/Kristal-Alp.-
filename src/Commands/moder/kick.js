const Command = require('../../Structures/Command');
module.exports = class extends Command {
        constructor(...args) {
            super(...args, {
                aliases: ['kick'],
                category: 'moder',
                Permission:["KICK_MEMBERS"],
                PermissionBOT:["KICK_MEMBERS"],
            });
        }
        run(message,language,args) {
        try {
            let member =  message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first()  || message.guild.members.cache.get(args[0]))
            if(member.kickable === true){
            if(!member)return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.nomember));
            let reason = args[1]||language.undefined
            member.kick([reason])
            message.channel.send(this.Main.embeds.OKEmbed.setDescription(language.ban.params.param1.translate({name:member.user.name,reason:reason})))
            }else return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.ban.params.param2))
        } catch (error) {
            console.log(error)
        }
}
}