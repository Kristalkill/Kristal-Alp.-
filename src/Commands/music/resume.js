const Command = require('../../Structures/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {});
  }

  async run(message) {
    const player = this.Main.music.players.get(message.guild.id);
    if (!player)
      return message.reply(
        'ДА МУЗЛО ЗАКАЖИ,ЧМО ЕБАНОЙ,ГАВНО САБАЧОЕ,ПЁС ВОНЮЧИЙ'
      );
    await player.resume();
    return message.reply('Продолжаем!');
  }
};
