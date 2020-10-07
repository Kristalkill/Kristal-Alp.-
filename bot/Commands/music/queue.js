const humanizeDuration = require('humanize-duration');
const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Construction/Command');
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {});
  }

  async run(message) {
    const language = require(`../../languages/${
      message.guild.settings.Moderation.language || 'en'
    }.json`);

    const dispatcher = this.Main.music.queue.get(message.guild.id);
    if (!dispatcher) return message.reply(language.nomusic);
    const current = dispatcher.current;
    let embed = new MessageEmbed().setTitle(language.queue.params.param1);
    embed.description = `[${current.info.position}] [${current.info.title}](${
      current.info.uri
    }) - ${humanizeDuration(current.info.length, {
      round: true,
      language: message.guild.settings.Moderation.language,
    })}(${language.queue.params.param2})\n`;
    if (dispatcher.queue.length > 0) {
      for (const e of dispatcher.queue) {
        embed.description += `[${e.info.position + 1}] [${e.info.title}](${
          e.info.uri
        }) - ${humanizeDuration(e.info.length, {
          round: true,
          language: message.guild.settings.Moderation.language,
        })}\n`;
      }
    }
    return message.channel.send(embed);
  }
};
