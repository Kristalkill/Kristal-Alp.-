const Discord = require('discord.js');
const humanizeDuration = require('humanize-duration')
const Command = require('../../Structures/Command');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['botinfo'],
		});
	}
	run(message) {
      try{
        let CPU = this.Main.shard.fetchClientValues('(process.cpuUsage().user/1024/1024/100).toFixed(2)').then(results => {results.reduce((acc, guildCount) => acc + guildCount, 0)})
        let RAM = this.Main.shard.fetchClientValues('process.memoryUsage().rss').then(results => {results.reduce((acc, guildCount) => acc + guildCount, 0)})
        let Uptime = this.Main.shard.fetchClientValues('this.uptime')
        let DiscordApi = this.Main.shard.fetchClientValues('new Date().getTime() - message.createdTimestamp')
        let Ping = this.Main.shard.fetchClientValues('Math.round(this.ws.ping)')
        let Users = this.Main.shard.fetchClientValues('users.cache.size').then(results => {results.reduce((acc, guildCount) => acc + guildCount, 0)})
        let Servers = this.Main.shard.fetchClientValues('guilds.cache.size').then(results => {results.reduce((acc, guildCount) => acc + guildCount, 0)})
        let Channels = this.Main.shard.fetchClientValues('channels.cache.size').then(results => {results.reduce((acc, guildCount) => acc + guildCount, 0)})
        let Emojis = this.Main.shard.fetchClientValues('emojis.cache.size').then(results => {results.reduce((acc, guildCount) => acc + guildCount, 0)})
        let Botinfoembed = new Discord.MessageEmbed()
          message.channel.send(Botinfoembed
          .setTitle("**Показатели бота**")
          .setColor("RANDOM")
          .setThumbnail(message.guild.iconURL())
          .addField(
            `**Техническая**`, `>>> **<:cpu:709750871692542142> | CPU:** ${CPU}%
            **<:ram:709751455610961972> | RAM:**  ${this.Main.utils.formatBytes(RAM)} 
            **🕑 | Uptime:**  ${humanizeDuration(Uptime,{ round: true,language: "ru"})}
            **⚙ | Кол-во команд:**  ${this.Main.commands.size}
            **💡 | Discord.js:**  v${Discord.version}
            **Discord API:** ${DiscordApi}'ms'
            **Bot Ping:** ${Ping}ms.`, true)
          .addField(
          `**👥 | Социальная**`, `>>> **:man_artist_tone3:Пользователей**  ${Users}
          **🌐 | Серверов:**  ${Servers}
          **🗨 | Каналов:**  ${Channels}
          **🤣 | Емодзи:**  ${Emojis}`, true))
      } catch (error) {
        console.log(error)
      }}}
