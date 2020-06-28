toNum = require('../../functions/toNum.js')
module.exports = {
    name: 'cancel',
    description: 'Напишу потом',
    aliases: ["cancel"],
    public: true,
     async execute (Main, message, args,res) {
const member = message.mentions.users.first() || message.guild.members.cache.get(args[1])
const MarryEmbed = new Discord.MessageEmbed()
.setColor("#F430FF")
User.findOne({guildID: message.guild.id, userID:message.author.id},(err,Data) => {
if (err){console.log(err)}
if (Data){
  if (!member)return message.reply('Укажите пользователя');
  User.findOne({guildID: message.guild.id, userID:member.id},(err,Data1) => {
  if (Data.sended == '0')return message.reply('Вы не отправляли предложений');
      Data.sended = '0';
      let sendersArray = Data1.senders.split(',');
      sendersArray.splice(sendersArray.indexOf(message.author.id), 1)
      let c = sendersArray.join(',')
      Data1.senders = c;
      Data.save()
      Data1.save()
      MarryEmbed.setTitle('Вы успешно отменили предложение')
      return message.channel.send(MarryEmbed);
})}})}}
