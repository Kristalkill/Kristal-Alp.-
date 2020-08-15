const Command = require('../../Structures/Command');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['pay'],
			description: 'pay',
			category: 'economy'
		});
	}
	run(message,args) {
        try {
            let member =  message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first() || message.guild.members.cache.get(args[3]));
            if(!member) return  message.channel.send(this.embeds.ErrEmbed.setDescription(`Пользователь не был найден.`))
            if(!args[1]) return  message.channel.send(this.embeds.ErrEmbed.setDescription(`Укажите количество монет которых хотите отдать.`))
            if(args[1] < 1) return  message.channel.send(this.embeds.ErrEmbed.setDescription(`Нельзя передать такое количество монет`))
            if(isNaN(args[1])) return  message.channel.send(this.embeds.ErrEmbed.setDescription(`Укажите корректное значение.`))
            this.Main.db.User.findOne({guildID: message.guild.id, userID: message.author.id},(err,loc) => {
            this.Main.db.User.findOne({guildID: message.guild.id, userID: member.id},(err,data) => {
                if(!data) return message.channel.send(this.embeds.ErrEmbed.setDescription(`К сожелению **${member.user.tag}** нету в базе-данных.`));
                if(loc.money < args[1]) return  message.channel.send(this.embeds.ErrEmbed.setDescription(`У вас нету такого количества монет.`));
                if(loc.userID == member.id) return  message.channel.send(this.embeds.ErrEmbed.setDescription(`Вы не можете передать монеты самому себе!`));
                if(member.user.bot) return  message.channel.send(this.embeds.ErrEmbed.setDescription(`Боты не люди.`));
                    loc.money -= Math.floor(parseInt(args[1]));
                    data.money += Math.floor(parseInt(args[1]));
                    loc.save(); data.save()
                    message.channel.send(this.embeds.OKEmbed.setDescription(`**${message.author.username}** успешно передал **${member.user.username}** монетки в количестве ${args[1]}`))
                    })
                })
        } catch (error) {
            console.log(error.stack)
        }
    }
}
