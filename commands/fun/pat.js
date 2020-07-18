ErrEmbed = require('../../embeds/ErrEmbed.js')
module.exports = {
  name: 'pat',
  description: 'почесать',
  aliases: ["pat"],
  public: true,
  async execute(Main, message, args) {
        let user = message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first()  || message.guild.members.cache.get(args[0]));
        if (!user) return  message.channel.send(ErrEmbed.setDescription('Укажите пользователя'));
        const embed = new Discord.MessageEmbed()
        .setImage(await require(`node-fetch`)(`https://nekos.life/api/v2/img/pat`).then(r => r.json()).then(r => r.url))
        .setColor("#FF30A2")
        .setTitle(`${message.author.username} гладит ${message.mentions.users.first().username}`)
        message.channel.send(embed)
}
}
