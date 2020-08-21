const Command = require('../../Structures/Command');
const Discord = require('discord.js')
module.exports = class extends Command {
  constructor(...args) {
      super(...args, {
          aliases: ['unwarn'],
          category: 'moder',
          Permission:["KICK_MEMBERS"],
      });
  }
  run(message,args) {
    try {
      let reason = args.slice(1).join(` `); 
      let member = message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first())
      if(!member) return  message.channel.send(`Пользователь не найден. Укажите его, упомынув его.`)
      if(member.user.id == message.author.id) return  message.channel.send(`Ой дебиллл!`)
      if(member.user.bot) return  message.channel.send(`Боты не по моей части`)
      this.Main.db.User.findOne({guildID: message.guild.id, userID: member.id}, (err,data) => {
        if(err)return console.log(err)
        if(!data){
          let errorMess = new Discord.MessageEmbed()
          .setColor('RED')
          .setDescription(`К сожелению **${member.user.tag}** нету в базе-данных. Соотвественно он не мог ничего нарушить.`)
          return message.channel.send(errorMess)
        }
          data.warn += 1
          data.save()
          message.channel.send(this.Main.embeds.OKEmbed.setDescription(`Модератор: ${message.author.tag}\nНарушитель: ${member.user.tag}\nПричина: ${reason||'Отсуствует'}\nПредупреждений: ${data.warn}/${Data.warn||0}`))
      })
    } catch (error) {
      console.log(error)
    }}};
