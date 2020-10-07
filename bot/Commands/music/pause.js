const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {});
  }

  async run(message) {
    const language = require(`../../languages/${
      message.guild.settings.Moderation.language || 'en'
    }.json`);

    const dispatcher = this.Main.music.queue.get(message.guild.id);
    if (!dispatcher)
      return await message.channel.send(
        this.Main.embeds.ErrEmbed.setDescription(language.nomusic)
      );
    if (dispatcher.player.paused === true)
      return await message.channel.send(
        this.Main.embeds.ErrEmbed.setDescription(language.pause.param1)
      );
    await dispatcher.player.setPaused(true);
    return await message.channel.send(
      this.Main.embeds.ErrEmbed.setDescription(language.pause.param2)
    );
  }
};
