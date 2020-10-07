const Discpatcher = require('./Discpatcher.js');
module.exports = class Queue extends Map {
  constructor(Main, iterable) {
    super(iterable);
    this.Main = Main;
  }

  async handle(node, track, message) {
    const existing = this.get(message.guild.id);
    if (!existing) {
      const player = await node.joinVoiceChannel({
        guildID: message.guild.id,
        voiceChannelID: message.member.voice.channelID,
      });
      this.Main.logger.debug(
        player.constructor.name,
        `Новое соединение @ guild "${message.guild.id}"`
      );
      const dispatcher = new Discpatcher({
        Main: this.Main,
        guild: message.guild,
        text: message.channel,
        player,
      });
      dispatcher.queue.push(track);
      this.set(message.guild.id, dispatcher);
      this.Main.logger.debug(
        dispatcher.constructor.name,
        `Диспетчер нового игрока @ guild "${message.guild.id}"`
      );
      return dispatcher;
    }
    existing.queue.push(track);
    return null;
  }
};
