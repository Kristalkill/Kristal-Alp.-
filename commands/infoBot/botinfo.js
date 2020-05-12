module.exports = {
    name: "botinfo",
    description: "Команда позволяющая узнать описание других, не круто ли?",
    aliases: ["boti","botstats","bi"],
    public: true,
    async execute(Main, message, args) {
        const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const embed = new Discord.RichEmbed()
            .setAuthor("Показатели бота")
            .setColor("#a7f442")
            .setThumbnail('https://discordemoji.com/assets/emoji/3619_discord_online.png')
            .setTimestamp()
            .addField("**⭕ | Использование памяти**", `**${(process.memoryUsage().heapUsed / (1000 * 1000)).toFixed(2)} MB**`, true)
            .addField("**🕑 | Uptime**", `**${duration}**`, true)
            .addField("**👥 | Пользователей**", `**${Main.users.size.toLocaleString()}**`, true)
            .addField("**🌐 | Серверов**", `**${Main.guilds.size.toLocaleString()}**`, true)
            .addField("**🗨 | Каналов**", `**${Main.channels.size.toLocaleString()}**`, true)
            .addField("**⚙ | Кол-во команд**", `**${Main.commands.size.toLocaleString()}**`, true)
            .addField("**💡 | Discord.js**", `**v${version}**`, true)
            .setFooter("Автор команды: END");
          }
        }
