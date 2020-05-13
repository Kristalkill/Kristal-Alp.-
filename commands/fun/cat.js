const superagent = require('superagent');
module.exports = {
  name: 'cat',
  description: 'Рандомный котик',
  aliases: ["cat"],
  public: true,
  async execute(Main, message, args) {
    var {body} = await superagent.get(`http://aws.random.cat//meow`)
    var cat = new Discord.MessageEmbed()
        .setColor('#fadbc8')
        .setImage(body.file)
        .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
    message.channel.send(cat)
}
}
