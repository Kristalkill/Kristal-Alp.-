toNum = require('../../functions/toNum.js')
module.exports = {
    name: 'partner',
    description: 'Напишу потом',
    aliases: ["partner"],
    public: true,
     async execute (Main, message, args,res) {
try{
const member = message.mentions.users.first() || message.guild.members.cache.get(args[1])
const MarryEmbed = new Discord.MessageEmbed()
.setColor("#F430FF")
User.findOne({guildID: message.guild.id, userID:message.author.id},(err,Data) => {
if (err){console.log(err)}
if (Data){
switch (args[0]) {
case 'send':{
if (!member)return message.reply('Укажите пользователя');
User.findOne({guildID: message.guild.id, userID:member.id},(err,Data1) => {
if ((Data.level||Data1.level) < res.Economy.Partner.level) return message.reply(`У вас или у вашего партнера нету ${res.Economy.Partner.level} уровня`);
if (Data.money < res.Economy.Partner.level)return message.reply(`Для отправки предложения надо ${res.Economy.Partner.level}`);
if ((Data.partner||Data1.partner)!= '0')return message.reply('У вас или у игрока уже есть партнер');
if (!Data1)return message.reply('Пользователь не найден в базе данных');
if (Data.sended != '0')return message.reply(`Вы уже оправили запрос! Для отмены используйте ${res.Moderation.prefix}partner cancel`);
if (Data.senders.indexOf(message.author.id) != -1)return message.reply(`Вы уже отправили запрос этому человеку`);
if (Data1.senders.split(',') >= 5)return message.reply('Пользователь уже имеет максимальное количество предложений');
Data1.senders += `,${message.author.id}`
Data.sended = member.id
Data.save()
Data1.save();
MarryEmbed.setTitle(`Вы успешно отправили предложение ${member.tag}`);
message.channel.send(MarryEmbed)
})
break
}
case 'cancel':{
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
})
break
}
case 'senders':{
    if (Data.senders.length <= 2)return message.reply('Вам никто не отправлял предложение');
    let usersArr = Data.senders.split(',')
    let txt = '';
    for (let i = 0; i < usersArr.length; i++) {
                    let getted = Main.users.cache.get(usersArr[i])
                    txt += `**1.${getted.tag}**`
                }
    MarryEmbed.addField('Список предложений:', txt);
    MarryEmbed.setFooter('Для принятия введите !marry accept номер')
    return message.channel.send(MarryEmbed);
    break
}
case 'clear':{
    if (Data.senders.length <= 2)return message.reply('Вам никто не отправлял предложение');
    let sendersArr = Data.senders.split(',');
    (async function(){
    for (let i = 0; i < sendersArr.length; i++) {
                    let curUser = await User.findOne({userID:sendersArr[i]});
                    curUser.sended = '0';
                    await curUser.save();
                }})
    Data.senders = '';
    Data.save();
    MarryEmbed.setTitle('Вы успешно отчистили список предложений')
    return message.channel.send(MarryEmbed);
    break
}
case 'accept':{
                    if (Data.senders.length <= 2)return message.reply(`У вас нет предложений`);
                    if (!args[1])return message.reply(new Discord.MessageEmbed(), `Укажите число от 1 до ${Data.senders.split(',').length}. Чтобы посмотреть список партнеров введите ${res.Moderation.prefix}marry senders`);
                    let acceptNum = toNum(args[1])
                    if (!acceptNum || acceptNum == 0 || acceptNum > Data.senders.split(',').length)return message.reply(`Укажите число от 1 до ${Data.senders.split(',').length}. Чтобы посмотреть список партнеров введите ${res.Moderation.prefix}marry senders`);
                    let sendersArr2 = Data.senders.split(',');
                    let acceptUser = sendersArr2[acceptNum - 1];
                    (async function(){
                    for (let i = 0; i < sendersArr2.length; i++) {
                    let curUser1 =  await User.findOne({userID:sendersArr2[i]});
                    curUser1.sended = '0';
                    await curUser1.save();

                }});
                  (async function(){
                    let marryUser = User.findOne({userID:acceptUser })
                    marryUser.partner = message.author.id
                    marryUser.senders = ''
                    marryUser.save()
                    })
                    Data.partner = acceptUser
                    Data.senders = ''
                    Data.save()
                    let sUserz = Main.users.cache.get(acceptUser);
                    MarryEmbed.setTitle(`Вы успешно приняли предложение от ${sUserz.tag}`)
                    return message.channel.send(MarryEmbed);
                    break
                    }
case 'divorce':{
if ((Data.partner||Data1.partner) == '0')return message.reply('У тебя нету партнера');
(async function(){
let activePartner = User.findOne({ userID:Data.partner });
activePartner.partner = '0';
activePartner.save();
})
Data.partner = '0';
Data.save();
MarryEmbed.setTitle('Как жаль но вы развелись с своим партнером! Будем надеятся вы найдете себе лучше');
return message.channel.send(MarryEmbed);
}
}
}
})
}catch (err) {
    console.log(err)
}
}
}
