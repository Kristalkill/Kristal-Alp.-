const Discord = require('discord.js')
const humanizeDuration = require('humanize-duration')
const Command = require('../../Structures/Command');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['botinfo'],
			description: 'botinfo',
		});
	}
	run(message) {
      try{
        let  Botinfoembed = new Discord.MessageEmbed()
          message.channel.send(Botinfoembed
          .setTitle("**Показатели бота**")
          .setColor("RANDOM")
          .addField(
            `**Техническая**`, `>>> **<:cpu:709750871692542142> | CPU:**  ${(process.cpuUsage().user/1024/1024/100).toFixed(2)}%
            \n**<:ram:709751455610961972> | RAM:**  ${(process.memoryUsage().heapUsed / (1000 * 1000)).toFixed(2)} MB
            \n**🕑 | Uptime:**  ${humanizeDuration(this.Main.uptime,{ round: true,language: "ru"})}
            \n**⚙ | Кол-во команд:**  ${this.Main.commands.size}
            \n**💡 | Discord.js:**  v${Discord.version}
            \n**Discord API:** ${new Date().getTime() - message.createdTimestamp}'ms'
            \n**Bot Ping:** ${Math.round(this.Main.ws.ping)}ms.`, true))
          .addField(
          "**👥 | Социальная**", `>>> **:man_artist_tone3:Пользователей**  ${this.Main.users.cache.size}\n
          **🌐 | Серверов:**  ${this.Main.guilds.cache.size}\n
          **🗨 | Каналов:**  ${this.Main.channels.cache.size}`, true)
      } catch (error) {
        console.log(error)
      }}}
