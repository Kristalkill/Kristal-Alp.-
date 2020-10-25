const {
  MessageEmbed
} = require('discord.js');
const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['slap'],
      category: 'fun',
    });
  }

  async run(message, args) {
    const language = this.language(message.guild.settings.Moderation.language)
    const member = this.get(args[0], message, 'members')
    if (!member) return this.Embed.ErrorEmbed(language.nomember, message)
    message.channel.send(new MessageEmbed()
      .setColor('#FF30A2')
      .setTitle(
        language.slap.param.translate({
          member1: message.author.username,
          member2: member.user.username,
        })
      )
      .setImage(await this.fetch('https://nekos.life/api/v2/img/slap'))
      .setFooter(
        message.author.tag,
        message.author.displayAvatarURL({
          dynamic: true
        })
      )
    )
  }
};