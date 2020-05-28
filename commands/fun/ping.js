module.exports = {
  name: 'ping',
  description: 'ping Бота',
  aliases: ["ping"],
  public: true,
  async execute(Main, message, args) {
        let embed = new Discord.MessageEmbed()
            .setColor('FFA947')
            .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
            .setTitle(`🏓 Pong!`)
            .addField(`PINGs:`, `Discord API:${new Date().getTime() - message.createdTimestamp + 'ms'}\nPing:${Math.round(Main.ws.ping)}ms.`)
        message.channel.send(embed);

}
}
