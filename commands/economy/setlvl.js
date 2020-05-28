ErrEmbed = require('../../embeds/ErrEmbed.js')
module.exports = {
  name: 'setlvl',
  description: 'Поставить уровень',
  aliases: ["setlevel","sl"],
  public: false,
  async execute(Main, message, args) {
    let member = message.guild.member(message.mentions.users.first() || message.author)
    User.findOne({guildID: message.guild.id, userID: member.user.id},(err,data) => {
      if(!args[0]) return message.reply(ErrEmbed.setDescription(`Укажите какой уровень  хотите поставить`))
      if(parseInt(args[0]) < 1)return message.reply(ErrEmbed.setDescription('Минимальний уровень это 1'))
      if(isNaN(args[0])) return message.reply(ErrEmbed.setDescription(`Это не является числом.`))
      if(member.user.bot) return message.reply(ErrEmbed.setDescription(`Боты не люди.`))
    let a = new Discord.MessageEmbed()
    .setDescription(`Вы успешно поставили **${member.user.username}** уровень  \`${args[0]}\``)
    .setColor(config.color)
    message.channel.send(a)
      data.level = parseInt(args[0]);
      data.save()
    })
  }
}
