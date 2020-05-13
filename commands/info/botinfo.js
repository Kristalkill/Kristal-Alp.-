const { version } = require("discord.js");
require("moment-duration-format");
module.exports = {
    name: "botinfo",
    description: "Команда позволяющая узнать описание других, не круто ли?",
    aliases: ["boti","botstats","bi"],
    public: true,
    async execute(Main, message, args) {
        const duration = moment.duration(Main.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const Botinfoembed = new Discord.MessageEmbed()
            .setTitle("**Показатели бота**")
            .setColor("RANDOM")
            .addField(`**<:cpu:709750871692542142> | CPU**`, `**${(process.cpuUsage().user/1024/1024/100).toFixed(2)}%**`, true)
            .addField(`**<:ram:709751455610961972> | RAM **`, `**${(process.memoryUsage().heapUsed / (1000 * 1000)).toFixed(2)} MB**`, true)
            .addField("**🕑 | Uptime**", `**${duration}**`, true)
            .addField("**👥 | Пользователей**", `**${Main.users.cache.size}**`, true)
            .addField("**🌐 | Серверов**", `**${Main.guilds.cache.size}**`, true)
            .addField("**🗨 | Каналов**", `**${Main.channels.cache.size}**`, true)
            .addField("**⚙ | Кол-во команд**", `**${Main.commands.size}**`, true)
            .addField("**💡 | Discord.js**", `**v${version}**`, true)
            .setFooter("Автор команды: END#3123");
          message.channel.send(Botinfoembed)
          }
        }
