module.exports = {
  name: 'reputation',
  description: 'rep',
  aliases: ["rep"],
  public: true,
  async execute(Main, message, args) {
    try {
      let OK = new Discord.MessageEmbed()
      .setDescription(`${member.user.username} имеет ${Data1.rep} репутаций`);
      const capitalize = i => {
      i = i.toString();
      return i[0].toUpperCase() + i.slice(1)}
      let member =  message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first() || message.guild.members.cache.get(args[1]));
      let arguments = capitalize(args[0]);
      User.findOne({guildID: message.guild.id, userID: message.author.id},(err,Data) => {
        User.findOne({guildID: message.guild.id, userID: member.id},(err,Data1) => {
          if(!Data1)return  message.channel.send(embeds.ErrEmbed.setDescription("Этого человека нету в БД"))
          if (!args[0]) return  message.channel.send(embeds.ErrEmbed.setDescription("Потом напишу"))
          if (Data.Timelyes._rep > Date.now()){
            message.channel.send(embeds.ErrEmbed.setDescription(`Время ещё не пришло,осталось ${humanizeDuration(Data.Timelyes._rep -  Date.now(),{ round: true,language: "ru"})}`))
          }else if ((args[0] = member)||(args[1] = member && arguments == "Add"||'Plus'||'+')){
            Data.Timelyes._rep = parseInt(Date.now() + 14400000)
            Data1.rep++
            Data.save()
            Data1.save()
            OK.setTitle(`**Репутация была повышена!**`)
            message.channel.send(OK)
          }else if (args[1] = member && arguments == "Remove"||'Minus'||'-'){
            Data.Timelyes._rep = parseInt(Date.now() + 14400000)
            Data1.rep--
            Data.save()
            Data1.save()
            OK.setTitle(`**Репутация была понижена!**`)
            message.channel.send(OK)
          }else{
            message.channel.send(embeds.ErrEmbed.setDescription('Использивание rep Add/Remove @member или rep @member'))
          }
        })
      })
}catch (error) {
  console.log(error.stack)
}
}
}
