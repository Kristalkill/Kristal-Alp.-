const Discord = require('discord.js');
const humanizeDuration = require('humanize-duration')
const Command = require('../../Structures/Command');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['botinfo'],
		});
	}
	async run(message) {
      try{
        const promises = [
          this.Main.shard.broadcastEval('(process.cpuUsage().user/1024/1024/100).toFixed(2)'),
          this.Main.shard.broadcastEval('process.memoryUsage().rss'),
          this.Main.shard.fetchClientValues('channels.cache.size'),
          this.Main.shard.fetchClientValues('guilds.cache.size'),
          this.Main.shard.fetchClientValues('emojis.cache.size'),
          this.Main.shard.fetchClientValues('users.cache.size'),

      ];
      return Promise.all(promises).then(results => { 
        const CPU = results[0].reduce((var1, var2) => var1 + var2, 0);
        const RAM = results[1].reduce((var1, var2) => var1 + var2, 0);
        const Channels = results[2].reduce((var1, var2) => var1 + var2, 0);
        const Servers = results[3].reduce((var1, var2) => var1 + var2, 0);
        const Emojis = results[4].reduce((var1, var2) => var1 + var2, 0);
        const Users = results[5].reduce((var1, var2) => var1 + var2, 0);
      });
        let Botinfoembed = new Discord.MessageEmbed()
         await message.channel.send(Botinfoembed
          .setTitle("**Показатели бота**")
          .setColor("RANDOM")
          .setThumbnail(message.guild.iconURL())
          .addField(
            `**Техническая**`, `>>> **<:cpu:709750871692542142> | CPU:** ${CPU}%
            **<:ram:709751455610961972> | RAM:**  ${this.Main.utils.formatBytes(RAM)} 
            **🕑 | Uptime:**  ${humanizeDuration(this.uptime,{ round: true,language: "ru"})}
            **⚙ | Кол-во команд:**  ${this.Main.commands.size}
            **💡 | Discord.js:**  v${Discord.version}
            **Discord API:** ${new Date().getTime() - message.createdTimestamp}ms
            **Bot Ping:** ${Math.round(this.Main.ws.ping)}ms.`, true)
          .addField(
          `**👥 | Социальная**`, `>>> **:man_artist_tone3:Пользователей**  ${Users}
          **🌐 | Серверов:**  ${Servers}
          **🗨 | Каналов:**  ${Channels}
          **🤣 | Емодзи:**  ${Emojis}`, true))
      } catch (error) {
        console.log(error)
      }}}
