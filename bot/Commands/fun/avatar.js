const {
  MessageEmbed
} = require('discord.js');
const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['avatar'],
      category: 'fun',
    });
  }

  async run(message, [user]) {
    const language = this.language(message.guild.settings.Moderation.language)
    const member = this.get(user, message, 'members')
    if (!member) return this.Embed.ErrorEmbed(language.nomember, message)
    await message.channel.send(new MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`${language.avatar.param} ${member.username}!`)
      .setImage(member.avatarURL({
        dynamic: true
      }))
      .setTimestamp());
  }
};