const Command = require('../../Structures/Command');
const humanizeDuration = require('humanize-duration')
const Discord = require('discord.js')
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['reputation'],
			description: 'reputation',
			category: 'economy'
		});
	}
	run(message,args) {
    try {
      let member =  message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first() || message.guild.members.cache.get(args[1]));
      this.Main.db.User.findOne({guildID: message.guild.id, userID: message.author.id},(err,Data) => {
        if(err)return console.log(err);
        this.Main.db.User.findOne({guildID: message.guild.id, userID: member.id},async(err,Data1) => {
          if(err)return console.log(err);
          let OK = new Discord.MessageEmbed()
          if(!Data1)return  message.channel.send(this.embeds.ErrEmbed.setDescription("Этого человека нету в БД"))
          if (!args[0]) return  message.channel.send(this.embeds.ErrEmbed.setDescription("Потом напишу"))
          if (Data.Timelyes._rep > Date.now())return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(`Время ещё не пришло,осталось ${humanizeDuration(Data.Timelyes._rep -  Date.now(),{ round: true,language: "ru"})}`))
          if ((args[0] = member)||(args[1] = member && args[0] == "Add"||'Plus'||'+')){
            Data.Timelyes._rep = parseInt(Date.now() + 14400000)
            Data1.rep++
            Data.save()
            Data1.save()
            OK.setTitle(`**Репутация была повышена!**`).setDescription(`${member.user.username} имеет ${Data1.rep} репутаций`);
            message.channel.send(OK)
          }else if (args[1] = member && args[0].toUpperCase() == "Remove"||'Minus'||'-'){
            Data.Timelyes._rep = parseInt(Date.now() + 14400000)
            Data1.rep--
            Data.save()
            Data1.save()
            OK.setTitle(`**Репутация была понижена!**`).setDescription(`${member.user.username} имеет ${Data1.rep} репутаций`);
            message.channel.send(OK)
          }else{
            message.channel.send(this.Main.embeds.ErrEmbed.setDescription('Использивание rep Add/Remove @member или rep @member'))
          }
        })
      })
}catch (error) {
  console.log(error.stack)
}
}
}
