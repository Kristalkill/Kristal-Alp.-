const Command = require('../../Structures/Command');
const {
  MessageEmbed
} = require('discord.js');
const fetch = require('node-fetch');
module.exports1 = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['fox'],
      category: 'fun',
    });
  }

  async run(message) {
    try {
      message.channel.send(new MessageEmbed()
        .setImage(await fetch('https://randomfox.ca/floof/')
          .then((r) => r.json())
          .then((r) => r.image))
        .setColor("#2f3136")
        .setTimestamp()
      )
    } catch (error) {
      console.log(error);
    }
  }
};