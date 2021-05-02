const ms = require('ms');
const Command = require('../../Structures/Construction/Command');
const humanizeDuration = require('humanize-duration');
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['slowmode'],
      category: 'moder',
      Permission: ['MANAGE_CHANNELS'],
      PermissionBOT: ['MANAGE_CHANNELS'],
    });
  }

  async run(message, args) {
    try {
      const language = require(`../../languages/${
        message.guild.settings.Moderation.language || 'en'
      }.json`);

      if (!args[0] || !parseInt(args[0]))
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(
            language.slowmode.params.param1
          )
        );
      if (!ms(args[0]) / 1000 < 21600000)
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(
            language.slowmode.params.param2
          )
        );

      await message.channel.setRateLimitPerUser(ms(args[0]) / 1000);
      message.channel.send(
        this.Main.embeds.OKEmbed.setDescription(
          language.slowmode.params.param2.translate({
            channel: message.channel,
            args: humanizeDuration(ms(args[0]), {
              round: true,
              language: message.guild.settings.Moderation.language,
            }),
          })
        )
      );
    } catch (error) {
      console.log(error);
    }
  }
};
