module.exports = class Dispatcher {
  constructor(options) {
    this.Main = options.Main;
    this.guild = options.guild;
    this.text = options.text;
    this.player = options.player;
    this.queue = [];
    this.current = null;

    this.player.on('start', () =>
      this.text
        .send(`Now Playing: **${this.current.info.title}**`)
        .catch(() => null)
    );
    this.player.on('end', () => {
      this.play().catch((error) => {
        this.queue.length = 0;
        this.destroy();
        this.Main.logger.error(error);
      });
    });
    for (const playerEvent of ['closed', 'error', 'nodeDisconnect']) {
      this.player.on(playerEvent, (data) => {
        if (data instanceof Error || data instanceof Object)
          this.Main.logger.error(data);
        this.queue.length = 0;
        this.destroy();
      });
    }
  }

  get exists() {
    return this.Main.music.queue.has(this.guild.id);
  }

  async play() {
    if (!this.exists || !this.queue.length) return this.destroy();
    this.current = this.queue.shift();
    await this.player.playTrack(this.current.track);
  }

  destroy(reason) {
    this.Main.logger.debug(
        this.player.constructor.name,
      `Destroyed the player dispatcher @ guild "${this.guild.id}"`
    );
    if (reason) this.Main.logger.debug(this.player.constructor.name, reason);
    this.queue.length = 0;
    this.player.disconnect();
    this.Main.logger.debug(
      this.player.constructor.name,
      `Destroyed the connection @ guild "${this.guild.id}"`
    );
    this.Main.music.queue.delete(this.guild.id);
    this.text.send('Left the channel due to empty queue.').catch(() => null);
  }
};
