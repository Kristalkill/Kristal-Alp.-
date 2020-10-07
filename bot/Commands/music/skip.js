const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {});
  }

  async run(message) {
    const language = require(`../../languages/${
      message.guild.settings.Moderation.language || 'en'
    }.json`);

    if (!message.member.voice.channelID)
      return await message.channel.send(language.novoice);
    const dispatcher = this.Main.music.queue.get(message.guild.id);
    if (!dispatcher) return await message.channel.send(language.nomusic);
    if (
      dispatcher.player.voiceConnection.voiceChannelID !==
      message.member.voice.channelID
    )
      return await message.channel.send(language.nomevoice);
    await dispatcher.player.stopTrack();
  }
};
