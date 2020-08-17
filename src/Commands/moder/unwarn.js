const Command = require('../../Structures/Command');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['unwarn'],
            description: 'unwarn',
            category: 'moder',
            Permission:["KICK_MEMBERS"],
        });
    }
    async run(message) {
    try {
      let member = message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first())
      if(!member) return  message.channel.send(`Пользователь не найден. Укажите его, упоменув его.`)
      if(member.user.id == message.author.id) return  message.channel.send(`Не офигел, ли часом ?`)
      if(member.user.bot) return  message.channel.send(`Боты не по моей части`)
      this.Main.db.User.findOne({guildID: message.guild.id, userID: member.id}, (err,data) => {
        if(!data)return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(`К сожелению **${member.user.tag}** нету в базе-данных.`));
          if(data.warn <= 0) return  message.channel.send(`У данного пользователя и так 0 предупреждений, куда меньше?`);
          data.warn -= 1
          data.save()
          message.channel.send(this.Main.embeds.OKEmbed .setDescription(`Модератор: ${message.author.tag}\nНарушитель: ${member.user.tag}\n\nПредупреждений: ${data.warn}/${Data.warn||0}`))
      })
    } catch (error) {
      console.log(error)
    }}};
