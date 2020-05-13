const superagent = require('superagent');
module.exports = {
  name: 'fox',
  description: 'Рандомная лиса',
  aliases: ["fox"],
  public: true,
  async execute(Main, message, args) {
    var {body} = await superagent.get(`https://randomfox.ca/floof/`)
    var fox = new Discord.MessageEmbed()
        .setColor('#fadbc8')
        .setImage(body.image)
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    message.channel.send(fox)
}
}
