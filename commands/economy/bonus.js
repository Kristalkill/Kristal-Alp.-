ErrEmbed = require('../../embeds/ErrEmbed.js')
module.exports = {
  name: 'bonus',
  description: 'Бонус',
  aliases: ["bon"],
  public: true,
  async execute(Main, message, args,res){
        User.findOne({guildID: message.guild.id, userID: message.author.id},(err,Data) => {
        if(Data.Timelyes._timely !== null && res.timely - (Date.now() - Data._timely) > 0){
        message.reply(`Вы уже взяли свой бонус. Приходите через ${ms(res.timely - (Date.now() - Data.Timelyes._timely))}`)
        }else{
        Data.Timelyes._timely = Date.now()
        Data.money += parseInt(res.bonus)
        Data.save()
        let a = new Discord.MessageEmbed()
        .setDescription(`Вы забрали ваш сегодняшний бонус. Вам было выдано \`$Bounus}\`копеек`)
        .setColor('RANDOM')
        message.channel.send(a)
      }
    })
  }
  }
