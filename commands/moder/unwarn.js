module.exports = {
  name: "unwarn",
  description: "Снятие предупреждения с пользователя.",
  Permission:["KICK_MEMBERS"],
  aliases: [],
  public: true,
  async execute(Main, message, args) {
      let member = message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first())
      if(!member) return  message.channel.send(`Пользователь не найден. Укажите его, упоменув его.`)
      if(member.user.id == message.author.id) return  message.channel.send(`Не офигел, ли часом ?`)
      if(member.user.bot) return  message.channel.send(`Боты не по моей части`)
      User.findOne({guildID: message.guild.id, userID: member.id}, (err,data) => {
        if(!data){
          let errorMess = new Discord.MessageEmbed()
          .setColor('RED')
          .setDescription(`К сожелению **${member.user.tag}** нету в базе-данных. Соотвественно он не мог ничего нарушить.`)
          return message.channel.send(errorMess)
        }
          if(data.warn <= 0){
            return  message.channel.send(`У данного пользователя и так 0 предупреждений, куда меньше?`)
          }
          data.warn -= 1
          data.save()
          let embed = new Discord.MessageEmbed()
          .setColor(config.color)
          .setDescription(`Модератор: ${message.author.tag}\nНарушитель: ${member.user.tag}\n\nПредупреждений: ${data.warn}/${Data.warn||0}`)
          message.channel.send(embed)
      })
  }
};
