const { MessageEmbed } = require('discord.js');
const humanizeDuration = require('humanize-duration');
const Event = require('../Structures/Event');

module.exports = class extends Event {
  async run(oldmessage, message) {
    try {
      if (!message) return;
      if (message.channel.type === 'dm' || message.author.bot) return;
      const BlockY = await this.Main.db.Block.findOne({
        id: message.author.id,
      });
      message.member.options = await this.Main.db.User.findOne({
        guildID: message.guild.id,
        userID: message.author.id,
      });
      message.guild.settings = await this.Main.db.Guild.findOne({
        guildID: message.guild.id,
      });

      if (!message.member.options)
        await this.Main.db.User.create({
          guildID: message.guild.id,
          userID: message.author.id,
        });
      if (!message.guild.settings)
        await this.Main.db.Guild.create({
          guildID: message.guild.id,
          ownerID: message.guild.ownerid,
        });

      if (message.member.options && message.guild.settings) {
        if (!message.guild.me.hasPermission(['SEND_MESSAGES']))
          return message.guild.owner
            .send(
              this.Main.embeds.ErrEmbed.setDescription(language.message.perms1)
            )
            .catch();
        if (
          !this.Main.db.boxescoldown.has(message.guild.id) &&
          message.guild.settings.options.boxes === true
        ) {
          await this.Main.utils.Systems.Boxes.spawnrandombox(message);
        }
        const prefixes = [
          '<@704604456313946182>',
          '<@!704604456313946182>',
          `${message.guild.settings.Moderation.prefix}`,
        ];
        let prefix = false;
        for (const thisPrefix of prefixes) {
          if (
            message.content.toLowerCase().startsWith(thisPrefix.toLowerCase())
          )
            prefix = thisPrefix;
        }
        const [cmd, ...args] = message.content
          .slice(prefix.length)
          .trim()
          .split(/ +/g);
        const command = await (this.Main.commands.get(cmd.toLowerCase()) ||
          this.Main.commands.get(this.Main.aliases.get(cmd.toLowerCase())));

        if (BlockY && command) return message.react('733299144311177257');

        const language = require(`./../languages/${
          message.guild.settings.Moderation.language || 'en'
        }.json`);

        message.member.options.xp += message.guild.settings.Economy.xp;
        message.member.options.money += message.guild.settings.Economy.money;
        message.member.options.massages++;

        this.Main.utils.addAchievement(
          message.member.options.level >= 5,
          '3',
          message.member.options,
          message
        );
        this.Main.utils.addAchievement(
          message.member.options.money >= 1000,
          '2',
          message.member.options,
          message
        );

        if (
          message.member.options.xp >=
          message.guild.settings.Economy.upXP * message.member.options.level
        ) {
          message.member.options.xp -=
            message.guild.settings.Economy.upXP * message.member.options.level;
          message.member.options.level += 1;
          message.channel.send(
            new MessageEmbed().setDescription(
              language.message.levelup.translate({
                name: message.author.username,
                level: message.member.options.level,
              })
            )
          );
        }

        if (message.mentions.users.has('704604456313946182') && !command) {
          message.channel.send(
            new MessageEmbed().setTitle(
              `${language.message.param2} ${message.guild.settings.Moderation.prefix}`
            )
          );
        } else if (prefix && command) {
          if (!message.guild.me.hasPermission(['SEND_MESSAGES']))
            return message.guild.owner
              .send(
                this.Main.embeds.ErrEmbed.setDescription(
                  language.message.perms1
                )
              )
              .catch();

          const cooldown = this.Main.db.cooldowns.get(message.author.id);
          if (cooldown)
            return message.channel.send(
              this.Main.embeds.ErrEmbed.setDescription(
                language.message.param1.translate({
                  time: humanizeDuration(cooldown - Date.now(), {
                    round: true,
                    language: message.guild.settings.Moderation.language,
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

            this.Main.db.cooldowns.set(message.author.id, Date.now() + 5000);
            setTimeout(
              () => this.Main.db.cooldowns.delete(message.author.id),
              5000
            );

            const Uneed = this.Main.utils.managePerms(
              message,
              command.Permission,
              false
            );
            if (Uneed)
              return message.channel.send(
                this.Main.embeds.ErrEmbed.setDescription(
                  language.message.perms2.translate({ need: Uneed })
                )
              );
          }
          const Bneed = this.Main.utils.managePerms(
            message,
            command.PermissionBOT,
            true
          );
          if (Bneed)
            return message.channel.send(
              this.Main.embeds.ErrEmbed.setDescription(
                language.message.perms3.translate({ need: Bneed })
              )
            );

          await command.run(message, args);
        }
        message.member.options.save();
        message.guild.settings.save();
      }
    } catch (error) {
      console.log(error);
    }
  }
};
