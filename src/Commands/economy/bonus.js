const Command = require('../../Structures/Command');
module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['bonus'],
			description: 'bonus',
			category: 'economy'
		});
	}
	run(message) {
    try {
      this.Main.db.User.findOne({guildID: message.guild.id, userID: message.author.id},(err,Data) => {
        if(err)return console.log(err);
        this.Main.db.Guild.findOne({guildID: message.guild.id},(err,res) => {
        if(err)return console.log(err);
        if(Data.Timelyes._timely > Date.now()){
         message.channel.send(this.Main.embeds.ErrEmbed.setDescription(`Вы уже брали сегодня свой бонус. Приходите через ${ms(Data.Timelyes._timely - Date.now())}`))
        }else{
        Data.Timelyes._timely = parseInt(Date.now() + 86400000)
        Data.money += parseInt(res.Economy.bonus)
        Data.save()
        message.channel.send(this.Main.embeds.OKEmbed.setDescription(`Вы забрали ваш сегодняшний бонус в розмере \`${res.Economy.bonus}\` $`))
      }
    }) 
  })
    } catch (error) {
     console.log(error)
    }}}