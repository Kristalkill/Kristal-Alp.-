const superagent = require('superagent');
module.exports = {
  name: 'slap',
  description: 'Уебать кого-то',
  aliases: ["slap"],
  public: true,
    async execute(Main, message, args) {
        let user = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if (!user) return Main.sendErrEmbed(new Discord.MessageEmbed(), 'Укажите пользователя', true, message);
        const { body } = await superagent
            .get("https://nekos.life/api/v2/img/slap");
        const embed = new Discord.MessageEmbed()
            .setColor("#FF30A2")
            .setTitle(`${message.author.username} ударил(а) ${message.mentions.users.first().username}`)
            .setImage(body.url)
            .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(embed)
}
}
