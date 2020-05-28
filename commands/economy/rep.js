ErrEmbed = require('../../embeds/ErrEmbed.js')
module.exports = {
  name: 'reputation',
  description: 'rep',
  aliases: ["rep"],
  public: false,
  async execute(Main, message, args) {
    const capitalize = i => {
      i = i.toString();
      return i[0].toUpperCase() + i.slice(1)
    }
let member =  message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]||args[1]))
let arguments = capitalize(args[0]);
User.findOne({guildID: message.guild.id, userID: message.author.id},(err,Data) => {
User.findOne({guildID: message.guild.id, userID: member.id},(err,Data1) => {
if(!Data1)return message.reply(ErrEmbed.setDescription("Этого человека нету в БД"))
let minute = parseInt((Data.Timelyes._rep -  Date.now())/1000/60%24);
let hour = parseInt((Data.Timelyes._rep -  Date.now())/1000/60/60%60);
if (!args[0]) return message.reply(ErrEmbed.setDescription("Потом напишу "))
if (Data.Timelyes._rep > Date.now()){
  if(hour < 60){
      message.channel.send(ErrEmbed.setDescription(`Время ещо не прошло,осталось **Минут** ${minute}`))
  }
  else {
     message.channel.send(ErrEmbed.setDescription(`Время ещо не прошло,осталось **Часов** ${hour} **Минут** ${minute}`))
  }
}
else if ((args[0] = member)||(args[1] = member && arguments == "Add"||'Plus'||'+')){
  Data.Timelyes._rep = parseInt(Date.now() + 14400000)
  Data1.rep++
  Data.save()
  Data1.save()
  let OK = new Discord.MessageEmbed()
  .setTitle(`**Репутация была повышена!**`)
  .setDescription(`${member.user.username} имеет ${Data1.rep} репутаций`);
  message.channel.send(OK)
}
else if (args[1] = member && arguments == "Remove"||'Minus'||'-'){
  Data.Timelyes._rep = parseInt(Date.now() + 14400000)
  Data1.rep--
  Data.save()
  Data1.save()
  let OK = new Discord.MessageEmbed()
  .setTitle(`**Репутация была понижена!**`)
  .setDescription(`${member.user.username} имеет ${Data1.rep} репутаций`);
  message.channel.send(OK)
}
else {
  message.channel.send(ErrEmbed.setDescription('Использивание rep Add/Remove @member или rep @member'))
}
})
})
}
}
