ErrEmbed = require('../../embeds/ErrEmbed.js')
module.exports = {
  name: 'fox',
  description: 'Рандомная лиса',
  aliases: ["fox"],
  public: true,
async execute(Main, message, args) {
  const embed = new Discord.MessageEmbed()
.setColor("#FF30A2")
.setImage(await require(`node-fetch`)(`https://randomfox.ca/floof/`).then(r => r.json()).then(r => r.image))
.setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
message.channel.send(embed)
}
}
