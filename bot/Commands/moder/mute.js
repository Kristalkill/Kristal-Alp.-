const humanizeDuration = require('humanize-duration');
const ms = require('ms');
const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['mute'],
      category: 'moder',
      Permission: ['MANAGE_CHANNELS'],
      PermissionBOT: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
    });
  }

  async run(message, args) {
    try {
      const language = require(`../../languages/${
        message.guild.settings.Moderation.language || 'en'
      }.json`);

      const member = message.guild.member(
        message.mentions.users
        .filter((u) => u.id != message.guild.me.id)
        .first() || message.guild.members.cache.get(args[0])
      );
      if (!member)
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(language.nomember)
        );
      let muterole = message.guild.roles.cache.find((x) =>
        /(В)?[Mм][uyу][t(ьт)]([eеd])?/gi.test(x.name)
      );
      if (
        !message.guild.roles.cache.get(
          message.guild.settings.Moderation.muterole
        )
      ) {
        if (muterole) {
          message.guild.settings.Moderation.muterole = muterole.id;
        } else {
          try {
            muterole = message.guild.roles.create({
              name: 'Muted',
              color: '#000000',
              permissions: [],
            });
            message.guild.channels.forEach(async (channel) => {
              await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
              });
            });
            message.guild.settings.Moderation.muterole = muterole.id;
          } catch (e) {
            console.log(e.stack);
          }
        }
        message.guild.settings.Moderation.muterole = muterole.id;
      }
      if (!args[1])
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(language.mute.params.param3)
        );
      let time = ms(args[1]);
      const reason = args[2] || language.undefined;
      const res1 = await this.Main.db.Mute.findOne({
        guildID: message.guild.id,
        id: member.id,
      });
      if (res1)
        return message.channel.send(
          language.mute.params.param1.translate({
            member,
            reason: res1.reason,
            time: humanizeDuration(res1.time - Date.now(), {
              round: true,
              language: message.guild.settings.Moderation.language,
            }),
          })
        );
      this.Main.db.Mute.create({
        guildID: message.guild.id,
        id: member.id,
        reason,
        time: time ? time + Date.now() : time = false,
        channel: message.channel.id,
      });
      await member.roles.add(muterole.id);
      message.channel.send(
        language.mute.params.param1.translate({
          member,
          reason,
          time: time ? humanizeDuration(time, {
            round: true,
            language: message.guild.settings.Moderation.language,
          }) : language.mute.params.param2,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }
};