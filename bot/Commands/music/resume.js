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
    if (!dispatcher) return message.reply(language.nomusic);
    if (dispatcher.player.paused === false)
      return message.reply(language.resume.params.param1);
    await dispatcher.player.setPaused(false);
    return message.reply(
      language.resume.params.param2.translate({
        current: dispatcher.current.info.title,
      })
    );
  }
};
