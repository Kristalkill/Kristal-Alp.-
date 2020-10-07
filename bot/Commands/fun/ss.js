const Discord = require('discord.js');
const fetch = require('node-fetch');
const Command = require('../../Structures/Command');

module.exports1 = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['ss'],
      nsfw: true,
      category: 'fun',
    });
  }

  async run(message, args) {
    try {
      const language = require(`../../languages/${
        message.guild.settings.Moderation.language || 'en'
      }.json`);

      if (!args[0])
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(language.ss.params.param1)
        );
      await fetch(`https://chromechain.herokuapp.com/?url=${args[0]}`)
        .then((res) => res.json())
        .then((body) => {
          if (!body) return;
          const embed = new Discord.MessageEmbed()
            .setTitle(language.ss.params.param2)
            .setDescription(args[0])
            .setImage(body.content);
          message.channel.send(embed);
        });
    } catch (error) {
      console.log(error);
    }
  }
};
