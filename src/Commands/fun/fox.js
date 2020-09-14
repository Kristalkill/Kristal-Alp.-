const Command = require('../../Structures/Command');
const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['fox'],
      category: 'fun',
    });
  }

  async run(message) {
    try {
      const embed = new Discord.MessageEmbed()
        .setColor('#FF30A2')
        .setImage(
          await fetch('https://randomfox.ca/floof/')
            .then((r) => r.json())
            .then((r) => r.image)
        )
        .setFooter(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        );
      message.channel.send(embed);
    } catch (error) {
      console.log(error);
    }
  }
};
