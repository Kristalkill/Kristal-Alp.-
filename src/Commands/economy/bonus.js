const Command = require('../../Structures/Command');
const ms = require('ms');
module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['bonus'],
			category: 'economy'
		});
	}
	run(message,language,args) {
    try {
      this.Main.db.User.findOne({guildID: message.guild.id, userID: message.author.id},(err,Data) => {
        if(err)return console.log(err);
        this.Main.db.Guild.findOne({guildID: message.guild.id},(err,res) => {
        if(err)return console.log(err);
        if(Data.Timelyes._timely > Date.now()){
         message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.bonus.params.param1.translate({time:ms(Data.Timelyes._timely - Date.now())})))
        }else{
        Data.Timelyes._timely = parseInt(Date.now() + 86400000)
        Data.money += parseInt(res.Economy.bonus)
        Data.save()
        message.channel.send(this.Main.embeds.OKEmbed.setDescription(language.bonus.params.param2.translate({bonus:res.Economy.bonus})))
      }
    }) 
  })
    } catch (error) {
     console.log(error)
    }}}