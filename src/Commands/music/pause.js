const Command = require('../../Structures/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {});
  }

  async run(message) {
    const player = this.Main.music.players.get(message.guild.id);
    if (!player)
      return message.reply('Музло закажи сначала,даун как ты родился блять?');
    await player.pause(true);
    return message.reply('Жду вас пидарасы');
  }
};
