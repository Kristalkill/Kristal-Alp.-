const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const humanizeDuration = require('humanize-duration');
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {});
  }
  _checkURL(string) {
    try {
      new URL(string);
      return true;
    } catch (error) {
      return false;
    }
  }

  async run(message, args) {
    const language = require(`../../languages/${
      message.guild.settings.Moderation.language || 'en'
    }.json`);

    if (!message.member.voice.channelID)
      return await message.channel.send(language.novoice);
    if (!args[0])
      return await message.channel.send(language.play.params.param1);
    const node = this.Main.music.getNode();
    const query = args.join(' ');
    if (this._checkURL(query)) {
      const result = await node.rest.resolve(query);
      if (!result)
        return await message.channel.send(language.play.params.param2);
      const { type, tracks, playlistName } = result;
      const track = tracks.shift();
      const isPlaylist = type === 'PLAYLIST';
      const res = await this.Main.music.queue.handle(node, track, message);
      if (isPlaylist) {
        for (const track of tracks)
          await this.Main.music.queue.handle(node, track, message);
      }
      await message.channel
        .send(
          isPlaylist
            ? language.play.params.param3.translate({ playlist: playlistName })
            : language.play.params.param4.translate({ track: track.info.title })
        )
        .catch(() => null);
      if (res) await res.play();
      return;
    }
    const searchData = await node.rest.resolve(query, 'youtube');
    if (!searchData.tracks.length)
      return await message.channel.send(language.play.params.param2);
    let e = new MessageEmbed().setTitle(
      language.play.params.param5.translate({ query: query })
    );
    const tracks = searchData.tracks.splice(10);
    let i = 1;
    e.description = '';
    tracks.forEach((x) => {
      e.description += `[${i++}] [${x.info.title}](${
        x.uri
      }) - ${humanizeDuration(x.info.length, {
        round: true,
        language: message.guild.settings.Moderation.language,
      })}\n`;
    });
    message.channel.send(e).then(async (m) => {
      const numbers = {
        '1️⃣': 0,
        '2️⃣': 1,
        '3️⃣': 2,
        '4️⃣': 3,
        '5️⃣': 4,
        '6️⃣': 5,
        '7️⃣': 6,
        '8️⃣': 7,
        '9️⃣': 8,
      };
      const reacted = await this.Main.utils.Rcollector(
        await this.Main.utils.reaction(
          ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'],
          m,
          true
        ),
        m,
        message.author,
        60000,
        1
      );
      reacted.on('collect', async (reaction) => {
        let b = numbers[reaction.emoji.name];
        const track = searchData.tracks[b];
        const res = await this.Main.music.queue.handle(node, track, message);
        await message.channel
          .send(
            language.play.params.param4.translate({ track: track.info.title })
          )
          .catch(() => null);
        if (res) await res.play();
      });
      reacted.on('end', (collected, reason) => {
        if (reason == 'limit') {
          m.delete();
        } else
          return m.edit(
            new MessageEmbed().setTitle(language.play.params.param6)
          );
      });
    });
  }
};
