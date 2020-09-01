const Command = require('../../Structures/Command');
const humanizeDuration = require('humanize-duration')
const Discord = require('discord.js');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['reputation'],
			category: 'economy'
		});
	}
	async run(message,language,args) {
    try {
      let member =  message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first() || message.guild.members.cache.get(args[0]));
      let Data =  await this.Main.db.User.findOne({guildID: message.guild.id, userID: message.author.id})
      let Data1 =  await this.Main.db.User.findOne({guildID: message.guild.id, userID: member.user.id})
      let OK = new Discord.MessageEmbed()
      if(!member)return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.nomember))
      if(!Data1)return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.noData))
      if (Data.Timelyes._rep > Date.now())return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(`Время ещё не пришло,осталось ${humanizeDuration(Data.Timelyes._rep -  Date.now(),{ round: true,language: "ru"})}`))
      if (["Remove",'Minus','-'].includes(args[1] ? args[1].toUpperCase(): "add")){
        Data1.rep--
        OK.setTitle(language.rep.params.up)
      }else{
        Data1.rep++
        OK.setTitle(language.rep.params.down)
      }
      OK.setDescription(language.rep.params.have.translate({name:member.user.username,rep:Data1.rep}))
      Data.Timelyes._rep = parseInt(Date.now() + 14400000)
      Data.save()
      Data1.save()
      message.channel.send(OK)
}catch (error) {
  console.log(error.stack)
}
}
}
