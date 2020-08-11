ErrEmbed = require('../../embeds/ErrEmbed.js')
module.exports = {
  name: 'bonus',
  description: 'Бонус',
  aliases: ["bon"], 
  public: true,
  async execute(Main, message, args,res){
    try {
      User.findOne({guildID: message.guild.id, userID: message.author.id},(err,Data) => {
        if(Data.Timelyes._timely > Date.now()){
         message.channel.send(ErrEmbed.setDescription(`Вы уже взяли свой бонус. Приходите через ${ms(Data.Timelyes._timely - Date.now())}`))
        }else{
        Data.Timelyes._timely = parseInt(Date.now() + 86400000)
        Data.money += parseInt(res.Economy.bonus)
        Data.save()
        let a = new Discord.MessageEmbed()
        .setDescription(`Вы забрали ваш сегодняшний бонус. Вам было выдано \`${res.Economy.bonus}\` $`)
        .setColor('RANDOM')
        message.channel.send(a)
      }
    }) 
    } catch (error) {
     console.log(error)
    }}}