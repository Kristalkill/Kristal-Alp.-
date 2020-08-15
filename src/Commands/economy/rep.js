const Command = require('../../Structures/Command');
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
      let OK = new Discord.MessageEmbed()
      .setDescription(`${member.user.username} имеет ${Data1.rep} репутаций`);
      let member =  message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first() || message.guild.members.cache.get(args[1]));
      this.Main.db.User.findOne({guildID: message.guild.id, userID: message.author.id},(err,Data) => {
        this.Main.db.User.findOne({guildID: message.guild.id, userID: member.id},(err,Data1) => {
          if(!Data1)return  message.channel.send(this.embeds.ErrEmbed.setDescription("Этого человека нету в БД"))
          if (!args[0]) return  message.channel.send(this.embeds.ErrEmbed.setDescription("Потом напишу"))
          if (Data.Timelyes._rep > Date.now()){
            message.channel.send(this.embeds.ErrEmbed.setDescription(`Время ещё не пришло,осталось ${humanizeDuration(Data.Timelyes._rep -  Date.now(),{ round: true,language: "ru"})}`))
          }else if ((args[0] = member)||(args[1] = member && args[0] == "Add"||'Plus'||'+')){
            Data.Timelyes._rep = parseInt(Date.now() + 14400000)
            Data1.rep++
            Data.save()
            Data1.save()
            OK.setTitle(`**Репутация была повышена!**`)
            message.channel.send(OK)
          }else if (args[1] = member && args[0] == "Remove"||'Minus'||'-'){
            Data.Timelyes._rep = parseInt(Date.now() + 14400000)
            Data1.rep--
            Data.save()
            Data1.save()
            OK.setTitle(`**Репутация была понижена!**`)
            message.channel.send(OK)
          }else{
            message.channel.send(this.embeds.ErrEmbed.setDescription('Использивание rep Add/Remove @member или rep @member'))
          }
        })
      })
}catch (error) {
  console.log(error.stack)
}
}
}
