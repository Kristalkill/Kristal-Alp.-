abbreviateNumber = require('../../functions/abbreviateNumber.js')
module.exports = {
  name: 'pf',
  description: 'Просмотр своего баланса.',
  aliases: ["profile","p","balance","$"],
  public: true,
  async execute(Main, message, args) {
    let member = message.guild.member(message.mentions.users.first() || message.author)
     if(member.user.bot) return message.reply(`**Error: Боты не люди**`)
    User.findOne({guildID: message.guild.id, userID: member.id},(err,Data) => {
if(err){
  console.log(err)
}
if(Data) {
    let clanid = Data.clanID;
    if (clanid === -1) {
        clanName = 'Нету'
    } else {
        let clan = Clan.findOne({ id: clanid });
        clanName = Data.claname;
    }
    let profileembed = new Discord.MessageEmbed()
        .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        .setColor(Guild.colors)
        .setTitle(`**${message.author.username}**`)
        .addField('**Статус**', `${message.member.presence.activities}\n${message.member.presence.Status}`, true)
        .addField('**Значки**',`${message.author.flags.toArray()}`, true)
        .addField('**Где сидиш**', `${message.member.presence.clientStatus}`, true)
        .addField('**💰 Баланс**', `**${abbreviateNumber(Data.money)} $**`, true)
        .addField('**🔰 Лвл**', `**${Data.level}**`, true)
        .addField('**🚩 Варны**', `**${Data.warn}**`)
        .addField('**⚔ Клан**', `**${clanName}**`, true)
        .addField('**💑 Партнер**', `**${Data.partner || 'Нету'}**`, true)
        .addField('**🏅 Достижения**', `**${Data.Achievements}**`)
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
     message.channel.send(profileembed) };
});
}
}
