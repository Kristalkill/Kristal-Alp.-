const Command = require('../../Structures/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['reverse'],
      category: 'fun',
    });
  }

  run(message, args) {
    try {
      const language = require(`./../languages/${
        message.guild.settings.Moderation.language || 'en'
      }.json`);
      if (!args)
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(language.reverse.param)
        );
      message.channel.send(
        this.Main.embeds.OKEmbed.setDescription(
          args.join(' ').split('').reverse().join('')
        )
      );
    } catch (error) {
      console.log(error);
    }
  }
};
