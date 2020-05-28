module.exports = {
  name: 'stopbot',
  description: 'eval',
  aliases: ["exit","sbot"],
  public: false,
  async execute(Main, message, args) {
    if (!config.owner.includes(message.author.id))return message.channel.send('Ти не овнер а гавно')
      let Exitembed = new Discord.MessageEmbed()
      .setTitle('Я успешно офнулся')
      .setDescription(`EMINEM-FRAMED`)
       await process.exit()
}
}
