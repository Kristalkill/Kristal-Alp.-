const Command = require('../../Structures/Command');
const Discord = require('discord.js')
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
        if(Data.Timelyes._timely > Date.now()){
         message.channel.send(this.embeds.ErrEmbed.setDescription(`Вы уже взяли свой бонус. Приходите через ${ms(Data.Timelyes._timely - Date.now())}`))
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