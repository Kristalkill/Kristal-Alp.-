ErrEmbed = require('../../embeds/ErrEmbed.js')
module.exports = {
  name: 'bonus',
  description: 'Бонус',
  aliases: ["bon"], 
  public: true,
  async execute(Main, message, args,res){
        User.findOne({guildID: message.guild.id, userID: message.author.id},(err,Data) => {
        if(Date.now() < Data.Timelyes._timely){
        message.reply(ErrEmbed.setDescription(`Вы уже взяли свой бонус. Приходите через ${ms(res.Economy.timely - (Date.now() - Data.Timelyes._timely))}`))
        }else{
        Data.Timelyes._timely = Date.now() + 86400000
        Data.money += parseInt(res.Economy.bonus)
        Data.save()
        let a = new Discord.MessageEmbed()
        .setDescription(`Вы забрали ваш сегодняшний бонус. Вам было выдано \`${res.Economy.bonus}\`копеек`)
        .setColor('RANDOM')
        message.channel.send(a)
      }
    })
  } 
  }