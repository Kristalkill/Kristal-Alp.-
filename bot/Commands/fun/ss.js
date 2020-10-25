const Discord = require('discord.js');
const fetch = require('node-fetch');
const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['ss'],
      nsfw: true,
      category: 'fun',
    });
  }

  async run(message, args) {
    const language = this.language(message.guild.settings.Moderation.language)
    if (!args[0]) return this.Embed.ErrorEmbed(language.ss.params.param1)
    await fetch(`https://chromechain.herokuapp.com/?url=${args[0]}`)
      .then((res) => res.json())
      .then((body) => {
        if (!body) return;
        message.channel.send(new Discord.MessageEmbed()
          .setTitle(language.ss.params.param2)
          .setDescription(args[0])
          .setImage(body.content));
      });
  }
};