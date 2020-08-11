const fetch = require('node-fetch');
ErrEmbed = require('../../embeds/ErrEmbed.js')
module.exports = {
  name: 'slap',
  description: 'Уебать кого-то',
  aliases: ["slap"],
  public: true,
    async execute(Main, message, args) {
      try{
              let user = message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first() || message.guild.members.cache.get(args[0]));
              if (!user) return  message.channel.send(ErrEmbed.setDescription('Укажите пользователя'));
              const embed = new Discord.MessageEmbed()
            .setColor("#FF30A2")
            .setTitle(`${message.author.username} ударил(а) ${message.mentions.users.first().username}`)
            .setImage(await require(`node-fetch`)(`https://nekos.life/api/v2/img/slap`).then(r => r.json()).then(r => r.url))
            .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(embed)
}catch(error){
  console.log(error)
}
}
}