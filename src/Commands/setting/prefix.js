const Discord = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['prefix'],
      Permission: ['ADMINISTRATOR'],
    });
  }

  async run(message, args) {
    try {
      const language = require(`../../languages/${
        message.guild.settings.Moderation.language || 'en'
      }.json`);

      const member = message.guild.member(message.author);
      if (args[0]) {
        message.guild.settings.Moderation.prefix = args[0].toLowerCase();
        const embed = new Discord.MessageEmbed()
          .setTitle(language.prefix.params.param1)
          .setDescription(
            language.prefix.params.param2.translate({
              member: member.user.username,
              args: args[0],
            })
          );
        message.channel.send(embed);
      } else
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(
            language.prefix.params.param3
          )
        );
    } catch (error) {
      console.log(error);
    }
  }
};
