const Command = require('../../Structures/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['unmute'],
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

      const muterole =
        message.guild.settings.Moderation.muterole.id ||
        message.guild.roles.cache.find((x) =>
          /(В)?[Mм][uyу][t(ьт)]([eеd])?/gi.test(x.name)
        ).id;
      const member = message.guild.member(
        message.mentions.users
          .filter((u) => u.id != message.guild.me.id)
          .first() || message.guild.members.cache.get(args[0])
      );
      if (member.roles.cache.has(muterole)) {
        const data = await this.Main.db.Mute.findOne({
          guildID: message.guild.id,
          id: member.id,
        });
        if (data) {
          this.Main.db.Mute.deleteOne({
            guildID: message.guild.id,
            id: member.id,
          });
          await member.roles.remove(muterole);
          message.channel.send(
            this.Main.embeds.OKEmbed.setDescription(
              member + language.unmute.params.param1
            )
          );
        } else
          return message.channel.send(
            this.Main.embeds.ErrEmbed.setDescription(
              member + language.unmute.params.param2
            )
          );
      }
    } catch (error) {
      console.log(error);
    }
  }
};
