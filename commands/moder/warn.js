module.exports = {
  name: "warn",
  description: "Выдать предупреждение пользователю",
  Permission:["KICK_MEMBERS"],
  aliases: [],
  public: true,
  async execute(Main, message, args) {
    try {
      let reason = args.slice(1).join(` `); if(!reason) reason = 'Отсуствует.'
      let member = message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first())
      if(!member) return  message.channel.send(`Пользователь не найден. Укажите его, упомынув его.`)
      if(member.user.id == message.author.id) return  message.channel.send(`Ой дебиллл!`)
      if(member.user.bot) return  message.channel.send(`Боты не по моей части`)
      User.findOne({guildID: message.guild.id, userID: member.id}, (err,data) => {
        if(!data){
          let errorMess = new Discord.MessageEmbed()
          .setColor('RED')
          .setDescription(`К сожелению **${member.user.tag}** нету в базе-данных. Соотвественно он не мог ничего нарушить.`)
          return message.channel.send(errorMess)
        }
          data.warn += 1
          data.save()
          let embed = new Discord.MessageEmbed()
          .setColor(Guild.color)
          .setDescription(`Модератор: ${message.author.tag}\nНарушитель: ${member.user.tag}\n\nПричина: ${reason}`)
          message.channel.send(embed)
          if(data.warn >= Guild.warn){
            if(member.kickable == false){
               message.channel.send(`Я не могу кикнуть данного пользователя из за нехватки прав. Предупреждения были обнулены.`)
              data.warn = 0;
              data.save()
            }else{
              message.guild.member(member).kick(reason)
               message.channel.send(`${member.user.tag} был кикнут за \`${reason}\``)
              data.warn = 0;
              data.save();
            }
          }
      })
    } catch (error) {
      
    }}};
