ErrEmbed = require('../../embeds/ErrEmbed.js')
module.exports = {
  name: 'cat',
  description: 'Рандомный котик',
  aliases: ["cat"],
  public: true,
  async execute(Main, message, args) {
      const embed = new Discord.MessageEmbed()
    .setColor("#FF30A2")
    .setImage(await require(`node-fetch`)(`https://api.thecatapi.com/v1/images/search`).then(r => r.json()).then(r => r.url))
    .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    message.channel.send(embed)
    }
    }
