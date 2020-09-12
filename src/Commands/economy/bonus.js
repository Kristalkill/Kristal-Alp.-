const Command = require('../../Structures/Command');
const ms = require('ms');
module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['bonus'],
			category: 'economy'
		});
	}
	async run(message) {
    try {
        const language = require(`../../languages/${message.guild.settings.Moderation.language ||"en"}.json`);
        if(message.member.options.Timelyes._timely > Date.now()){
         message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.bonus.params.param1.translate({time:ms(message.member.options.Timelyes._timely - Date.now())})))
        }else{
        message.member.options.Timelyes._timely = parseInt(Date.now() + 86400000)
        message.member.options.money += parseInt(message.guild.settings.Economy.bonus)
        message.channel.send(this.Main.embeds.OKEmbed.setDescription(language.bonus.params.param2.translate({bonus:message.guild.settings.Economy.bonus})))
      }
    } catch (error) {
     console.log(error)
    }}}