const Discord = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['slap'],
      category: 'fun',
    });
  }

  async run(message, args) {
    try {
      const language = require(`../../languages/${
        message.guild.settings.Moderation.language || 'en'
      }.json`);

      const member = message.guild.member(
        message.mentions.users
          .filter((u) => u.id != message.guild.me.id)
          .first() || message.guild.members.cache.get(args[0])
      );
      if (!member)
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(language.nomember)
        );
      const embed = new Discord.MessageEmbed()
        .setColor('#FF30A2')
        .setTitle(
          language.slap.param.translate({
            member1: message.author.username,
            member2: member.user.username,
          })
        )
        .setImage(
          await require('node-fetch')('https://nekos.life/api/v2/img/slap')
            .then((r) => r.json())
            .then((r) => r.url)
        )
        .setFooter(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        );
      message.channel.send(embed);
    } catch (error) {
      console.log(error);
    }
  }
};
