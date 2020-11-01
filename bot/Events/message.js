const {
  MessageEmbed
} = require('discord.js');
const humanizeDuration = require('humanize-duration');
const Event = require('../Structures/Construction/Event');
async function inviteCheck(id, message, Main) {
  if (
    message.guild.settings.Moderation.auto === true &&
    !message.member.hasPermission('ADMINISTRATOR') &&
    message.channel.permissionsFor(id).has('MANAGE_MESSAGES') &&
    new RegExp(
      `((?:(?:http|https)://)?(?:www.)?((?:disco|discord|discordapp).(?:com|gg|io|li|me|net|org)(?:/(?:invite))?/([a-z0-9-.]+)))`,
      'i'
    ).test(message.content)
  ) {
    const fetchInvite = await Main.fetchInvite(message.content).catch(null);

    if (fetchInvite && fetchInvite.guild.id !== message.guild.id) {
      await message.delete().catch(null);

      message.channel.send(
        `${fetchInvite.guild.name}(\`${fetchInvite.guild.id}\`) ОТ ${message.author}(\`${message.author.id}\`)`
      );

      return true;
    }
  }
}
module.exports = class extends Event {
  async run(message) {
    try {
      if (!message) return;
      if (message.channel.type === 'dm' || message.author.bot) return;
      let res = await this.Main.db.Guild.findOne({
        guildID: message.guild.id,
      });
      const BlockY = await this.Main.db.Block.findOne({
        id: message.author.id,
      });
      let data = await this.Main.db.User.findOne({
        guildID: message.guild.id,
        userID: message.author.id,
      });

      if (!data)
        await this.Main.db.User.create({
          guildID: message.guild.id,
          userID: message.author.id,
        });
      if (!res)
        await this.Main.db.Guild.create({
          guildID: message.guild.id,
          ownerID: message.guild.ownerid,
        });
      if (data && res) {
        message.guild.settings = res;
        if (await inviteCheck(this.Main, message, res)) return;
        message.member.options = data;
        const language = require(`./../languages/${
          res.Moderation.language || 'en'
        }.json`);
        if (!message.guild.me.hasPermission(['SEND_MESSAGES']))
          return message.guild.owner
            .send(
              this.Main.embeds.ErrEmbed.setDescription(language.message.perms1)
            )
            .catch();
        if (
          !this.Main.db.boxescoldown.has(message.guild.id) &&
          res.options.boxes === true
        ) {
          await this.Main.utils.Systems.Boxes.spawnrandombox(message);
        }
        const prefixes = [
          '<@704604456313946182>',
          '<@!704604456313946182>',
          `${res.Moderation.prefix}`,
        ];
        const prefix =
          prefixes.find((prefix) =>
            message.content.toLowerCase().startsWith(prefix.toLowerCase())
          ) || '';
        const [cmd, ...args] = message.content
          .slice(prefix.length)
          .trim()
          .split(/ +/g);
        const command = await (this.Main.commands.get(cmd.toLowerCase()) ||
          this.Main.commands.get(this.Main.aliases.get(cmd.toLowerCase())));

        if (BlockY && command) return message.react('733299144311177257');

        data.xp += res.Economy.xp;
        data.money += res.Economy.money;
        data.massages++;
        this.Main.utils.addAchievement(data.level >= 5, '3', data, message);
        this.Main.utils.addAchievement(data.money >= 1000, '2', data, message);

        if (data.xp >= res.Economy.upXP * data.level) {
          data.xp -= res.Economy.upXP * data.level;
          data.level += 1;
          message.channel.send(
            new MessageEmbed().setDescription(
              language.message.levelup.translate({
                name: message.author.username,
                level: data.level,
              })
            )
          );
        }
        if (message.mentions.users.has('704604456313946182') && !command) {
          message.channel.send(
            new MessageEmbed().setTitle(
              `${language.message.param2} ${res.Moderation.prefix}`
            )
          );
        } else if (prefix && command) {
          let [botperm, userperm] = this.Main.utils.managePerms(message, command)
          const cooldown = this.Main.db.cooldowns.get(message.author.id);
          if (cooldown)
            return message.channel.send(
              this.Main.embeds.ErrEmbed.setDescription(
                language.message.param1.translate({
                  time: humanizeDuration(cooldown - Date.now(), {
                    round: true,
                    language: res.Moderation.language,
                  }),
                })
              )
            );

          if (!this.Main.owners.includes(message.author.id)) {
            if (command.nsfw == true && message.channel.nsfw == false)
              return message.channel.send(
                this.Main.embeds.ErrEmbed.setDescription(
                  language.message.param3
                )
              );
            if (command.public === false) return;
            if (userperm) {
              message.channel.send(
                this.Main.embeds.ErrEmbed.setDescription(
                  language.message.perms2.translate({
                    need: userperm
                  })
                )
              );
            }
            this.Main.db.cooldowns.set(message.author.id, Date.now() + 5000);
            setTimeout(
              () => this.Main.db.cooldowns.delete(message.author.id),
              5000
            );
          }
          if (botperm) {
            message.channel.send(
              this.Main.embeds.ErrEmbed.setDescription(
                language.message.perms3.translate({
                  need: botperm
                })
              )
            );
          }
          await command.run(message, args);
        }
        message.member.options.save().catch(() => null);
        message.guild.settings.save().catch(() => null);
      }
    } catch (error) {
      console.log(error);
    }
  }
};