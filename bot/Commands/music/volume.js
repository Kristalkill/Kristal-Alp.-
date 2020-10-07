const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {});
  }

  async run(message, args) {
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
    if (!args[0] || isNaN(args[0]))
      return await message.channel.send(
        language.volume.params.param1.translate({
          volume: dispatcher.player.volume,
        })
      );
    const volume = Number(args[0]);
    if (volume < 10 || volume > 1000)
      return await message.channel.send(language.volume.params.param2);
    await dispatcher.player.setVolume(volume);
    await message.channel.send(
      language.volume.params.param3.translate({ volume: volume })
    );
  }
};
