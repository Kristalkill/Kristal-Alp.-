module.exports = {
  name: 'avatar',
  description: 'Аватар',
  aliases: ["avatar"],
  public: true,
  async execute(Main, message, args) {
    try {
      let user = message.mentions.users.first() ? message.mentions.users.first() : message.author;
      let AvatarEmbed = new Discord.MessageEmbed()
          .setColor('RANDOM')
          .setTitle(`Аватар ${user.username}!`)
          .setImage(user.avatarURL({dynamic: true}))
      await message.channel.send(AvatarEmbed)
    } catch (error) {
      console.log(error)
    }}}
