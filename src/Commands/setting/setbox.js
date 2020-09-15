const Command = require('../../Structures/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: [],
      Permission: ['ADMINISTRATOR'],
    });
  }

  async run(message, args) {
    if (!args[0]) return message.channel.send('on or off');
    const arg = args[0].toLowerCase();
    switch (true) {
      case arg == 'on' && message.guild.settings.options.boxes != true:
        message.guild.settings.options.boxes = true;
      case arg == 'off' && message.guild.settings.options.boxes != false:
        message.guild.settings.options.boxes = false;
      default:
        message.channel.send(
          `Уже и так ${message.guild.settings.options.boxes}`
        );
    }
  }
};
