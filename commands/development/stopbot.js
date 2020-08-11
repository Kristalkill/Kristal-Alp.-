module.exports = {
  name: 'stopbot',
  description: 'eval',
  aliases: ["exit","sbot"],
  public: false,
  async execute(Main, message, args) {
    try {
      let Exitembed = new Discord.MessageEmbed()
      .setTitle('Я успешно офнулся')
      .setDescription(`EMINEM-FRAMED`)
       await message.channel.send(Exitembed)
       await process.exit()
    } catch (error) {
      console.log(error)
    }
}
}
