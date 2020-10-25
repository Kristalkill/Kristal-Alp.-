const Command = require('../../Structures/Construction/Command');
const {
  MessageEmbed
} = require('discord.js');
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['fox'],
      category: 'fun',
    });
  }

  async run(message) {
    message.channel.send(new MessageEmbed()
      .setImage(await this.fetch('https://randomfox.ca/floof/'))
      .setColor("#2f3136")
      .setTimestamp()
    )
  }
};