module.exports = {
  name: 'stopbot',
  description: 'eval',
  aliases: ["exit","sbot"],
  public: false,
  async execute(Main, message, args) {
      let Exitembed = new Discord.MessageEmbed()
      .setTitle('Я успешно офнулся')
      .setDescription(`EMINEM-FRAMED`)
       await process.exit()
}
}
