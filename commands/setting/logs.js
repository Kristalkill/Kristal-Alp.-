module.exports = {
  name: 'logs',
  description: 'Настройка приветсвий.',
  aliases: ['l'],
  public: false,
  async execute(Main, message, args) {
    const capitalize = i => {
      i = i.toString();
      return i[0].toUpperCase() + i.slice(1)
    }
if (!args[0]) return  message.channel.send(LeaveHelpEmbed)
let text = capitalize(args[0].toLowerCase());
    Guild.findOne({guildID: message.guild.id}, (err, Data) => {

      if (err) {
        console.log(err)
      }
      if (Data) {
        switch (text) {
          case 'Invite': {


          break;}
          case 'Ban': {


          break;}
          case 'Message': {


          break;}
          case 'Kick': {


          break;}
          case 'Mute': {


          break;}
}
}
})
}
}
