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
            if(!args[1]||!member)return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription(`Пример использывания ${res.Moderation.prefix}kick @user/userid причина`));
            let reason = args[1]
            member.kick([reason])
            message.channel.send(this.Main.embeds.OKEmbed.setDescription(`${member.user.name} кикнут по причине **${reason}**`))
            }
            else{
                 message.channel.send(this.Main.embeds.ErrEmbed.setDescription("Я не могу кикнуть этого учасника"))
            }   
        } catch (error) {
            console.log(error)
        }
}
}