const { version } = require("discord.js");
module.exports = {
    name: "botinfo",
    description: "Команда позволяющая узнать описание других, не круто ли?",
    aliases: ["boti","botstats","bi"],
    public: true,
    async execute(Main, message, args) {
      try {
        const Botinfoembed = new Discord.MessageEmbed()
            .setTitle("**Показатели бота**")
            .setColor("RANDOM")
            .addField(`**Техническая**`, `>>> **<:cpu:709750871692542142> | CPU:**  ${(process.cpuUsage().user/1024/1024/100).toFixed(2)}%\n**<:ram:709751455610961972> | RAM:**  ${(process.memoryUsage().heapUsed / (1000 * 1000)).toFixed(2)} MB\n**🕑 | Uptime:**  ${humanizeDuration(Main.uptime,{ round: true,language: "ru"})}\n**⚙ | Кол-во команд:**  ${Main.commands.size}\n**💡 | Discord.js:**  v${version}`, true)
            .addField("**👥 | Социальная**", `>>> **:man_artist_tone3:Пользователей**  ${Main.users.cache.size}\n**🌐 | Серверов:**  ${Main.guilds.cache.size}\n**🗨 | Каналов:**  ${Main.channels.cache.size}`, true)
            .setFooter("Автор команды: END#3123");
          message.channel.send(Botinfoembed)
      } catch (error) {
        console.log(error)
      }}}
