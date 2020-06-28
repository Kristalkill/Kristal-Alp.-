toNum = require('../../functions/toNum.js')
module.exports = {
    name: 'sclear',
    description: 'Напишу потом',
    aliases: ["sclear"],
    public: true,
     async execute (Main, message, args,res) {
const member = message.mentions.users.first() || message.guild.members.cache.get(args[1])
const MarryEmbed = new Discord.MessageEmbed()
.setColor("#F430FF")
User.findOne({guildID: message.guild.id, userID:message.author.id},(err,Data) => {
if (err){console.log(err)}
if (Data){
    if (Data.senders.length <= 2)return message.reply(Errembed.setDescription('Вам никто не отправлял предложение'));
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
}})}}
