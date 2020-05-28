ErrEmbed = require('../../embeds/ErrEmbed.js')
module.exports = {
  name: 'kiss',
  description: 'Цмоки-чмоки',
  aliases: ["kiss"],
  public: true,
  async execute(Main, message, args) {
    const embed = new Discord.MessageEmbed()
  .setColor("#FF30A2")
  .setImage(await require(`node-fetch`)(`https://nekos.life/api/v2/img/kiss`).then(r => r.json()).then(r => r.url))
  .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
message.channel.send(embed)


}
};
