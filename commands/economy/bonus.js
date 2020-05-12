module.exports = {
  name: 'bonus',
  description: 'Бонус',
  aliases: ["bon"],
  public: true,
  async execute(bot, message, args) {
      Guild.findOne({guildID: message.guild.id}, (err,Data) => {
         if(err){console.log(err)}
         if(Data){
                let Timely = Data.timely
                let Bounus = Data.bonus

         }
      })
        await User.findOne({guildID: message.guild.id, userID: message.author.id},(err,data) => {
        if(data._timely !== null && Timely - (Date.now() - data._timely) > 0){
        message.reply(`Вы уже взяли свой бонус. Приходите через ${ms(Timely - (Date.now() - data._timely))}`)
        }else{
        data._timely = Date.now()
        data.money += parseInt(Bounus)
        data.save()
        let a = new Discord.MessageEmbed()
        .setDescription(`Вы забрали ваш сегодняшний бонус. Вам было выдано \`$Bounus}\`копеек`)
        .setColor(config.color)
        message.channel.send(a)
      }
    })
    }
  }
