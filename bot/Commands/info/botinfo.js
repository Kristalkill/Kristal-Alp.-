const Discord = require('discord.js');
const humanizeDuration = require('humanize-duration');
const Command = require('../../Structures/Construction/Command');
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['botinfo'],
    });
  }

  run(message) {
    try {
      const promises = [
        this.Main.shard.broadcastEval(
          '(process.cpuUsage().user/1024/1024/100)'
        ),
        this.Main.shard.broadcastEval('process.memoryUsage().rss'),
        this.Main.shard.fetchClientValues('channels.cache.size'),
        this.Main.shard.fetchClientValues('guilds.cache.size'),
        this.Main.shard.fetchClientValues('emojis.cache.size'),
        this.Main.shard.fetchClientValues('users.cache.size'),
      ];
      Promise.all(promises).then((results) => {
        const Botinfoembed = new Discord.MessageEmbed();
        message.channel.send(
          Botinfoembed.setTitle('**Показатели бота**')
          .setColor('RANDOM')
          .setThumbnail(message.guild.iconURL())
          .addField(
            '**Техническая**',
            `>>> **<:cpu:709750871692542142> | CPU:** ${results[0]
                .reduce((var1, var2) => var1 + var2, 0)
                .toFixed(2)}%
**<:ram:709751455610961972> | RAM:**  ${this.Main.utils.formatBytes(
                results[1].reduce((var1, var2) => var1 + var2, 0)
              )} 
**🕑 | Uptime:**  ${humanizeDuration(this.Main.uptime, {
                round: true,
                language: 'ru',
              })}
**⚙ | Кол-во команд:**  ${this.Main.commands.size}
**💡 | Discord.js:**  v${Discord.version}
**Discord API:** ${new Date().getTime() - message.createdTimestamp}ms
**Bot Ping:** ${Math.round(this.Main.ws.ping)}ms.`,
            true
          )
          .addField(
            '**👥 | Социальная**',
            `>>> **:man_artist_tone3:Пользователей**  ${results[5].reduce(
                (var1, var2) => var1 + var2,
                0
              )}
**🌐 | Серверов:**  ${results[3].reduce((var1, var2) => var1 + var2, 0)}
**🗨 | Каналов:**  ${results[2].reduce((var1, var2) => var1 + var2, 0)}
**🤣 | Емодзи:**  ${results[4].reduce((var1, var2) => var1 + var2, 0)}`,
            true
          )
        );
      });
    } catch (error) {
      console.log(error);
    }
  }
};