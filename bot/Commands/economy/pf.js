const Discord = require('discord.js');
const Command = require('../../Structures/Construction/Command');
const { Achievements } = require('../../utilites/variables.js');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['profile'],
      category: 'economy',
    });
  }

  async run(message, args) {
    try {
      const language = require(`../../languages/${
        message.guild.settings.Moderation.language || 'en'
      }.json`);
      const member = message.guild.member(
        message.mentions.users
          .filter((u) => u.id !== message.guild.me.id)
          .first() ||
          message.guild.members.cache.get(args[0]) ||
          message.author
      );
      const statuses = {
        online: '<a:online:709844735119851610>',
        dnd: '<a:dnd:709844760491196576>',
        idle: '<a:snow:709844747145052321>',
        offline: '<a:offline:709844724311392296>',
      };
      const devices = {
        desktop: language.pf.devices.pc,
        web: language.pf.devices.web,
        mobile: language.pf.devices.mobile,
      };
      let devicesText = ' ';
      Object.keys(member.user.presence.clientStatus).map(
        (dev) => (devicesText += `\n${devices[dev]}`)
      );
      const flags = {
        DISCORD_EMPLOYEE: '<:Staff:709858516390641745>',
        DISCORD_PARTNER: '<:Partner:709854788463886399>',
        HYPESQUAD_EVENTS: '<:HSEvents:709854801004986428>',
        BUGHUNTER_LEVEL_1: '<:BugHunter:709854729013821452>',
        HOUSE_BRAVERY: '<:HSBravery:709854778787758111>',
        HOUSE_BRILLIANCE: '<:HSBrilliance:709858505506553976> ',
        HOUSE_BALANCE: '<:HSBalance:709854768000008202>',
        EARLY_SUPPORTER: '<:EarlySupporter:709854757702861303',
        BUGHUNTER_LEVEL_2: '<:BugHunter2:709854743199219872>',
        VERIFIED_DEVELOPER: '<:coder:709854816725106859>',
      };
      let flag_text = ' ';
      const flag = member.user.flags.toArray();
      flag.length > 0
        ? flag.forEach((f) => {
            flag_text += `${flags[f]}`;
          })
        : (flag_text = language.pf.type.null);
      const activity =
        member.presence.activities.length > 0
          ? member.presence.activities
              .map((a) => {
                let str = '';
                if (a.type === 'CUSTOM_STATUS' && a.state)
                  return (str += `${a.state} `);
                switch (a.type) {
                  case 'PLAYING':
                    str = language.pf.type.play;
                    break;
                  case 'STREAMING':
                    str = language.pf.type.stream;
                    break;
                  case 'LISTENING':
                    str = language.pf.type.listen;
                    break;
                  case 'WATCHING':
                    str = language.pf.type.looks;
                    break;
                }
                if (a.name) str += `${a.name} `;
                if (a.details) str += `\n  ${a.details} `;
                if (a.state) str += `  ${a.state} `;
                if (a.url) str += `  ${a.url}`;
                return str;
              })
              .join('\n')
          : language.pf.type.null;
      if (member.user.bot)
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(language.bot)
        );
      const Data = await this.Main.db.User.findOne({
        guildID: message.guild.id,
        userID: message.author.id,
      });

      if (Data) {
        let reputation_text;
        switch (true) {
          case Data.rep <= -30:
            reputation_text = language.pf.reputation.satan;
            break;
          case Data.rep >= -10 && Data.rep <= -5:
            reputation_text = language.pf.reputation.devil;
            break;
          case Data.rep >= -4 && Data.rep < 0:
            reputation_text = language.pf.reputation.hypocrite;
            break;
          case Data.rep >= 0 && Data.rep <= 2:
            reputation_text = language.pf.reputation.neutral;
            break;
          case Data.rep >= 3 && Data.rep <= 9:
            reputation_text = language.pf.reputation.kind;
            break;
          case Data.rep >= 10 && Data.rep <= 30:
            reputation_text = language.pf.reputation.servant;
            break;
          case Data.rep >= 30:
            reputation_text = language.pf.reputation.angel;
            break;
        }
        let page = 1;
        const profile_embed_one = new Discord.MessageEmbed()
          .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
          .setTitle(`**${member.user.username}**`)
          .setColor('RANDOM')
          .addField(
            language.pf.embed.about,
            language.pf.embed.about1.translate({
              activity,
              ftext: flag_text,
              statuses: statuses[member.user.presence.status],
              devicesText,
              createdAt: this.Main.utils.formatDate(member.user.createdAt),
              joinedAt: this.Main.utils.formatDate(member.joinedAt),
            })
          )
          .addField(
            language.pf.embed.account,
            language.pf.embed.account1.translate({
              money: this.Main.utils.abbreviateNumber(Data.money),
              level: Data.level,
              xp: `${Data.xp}/${
                message.guild.settings.Economy.upXP * Data.level
              }`,
              leftxp:
                message.guild.settings.Economy.upXP * Data.level - Data.xp,
              warn: Data.warn,
              reputation: `${Data.rep}${reputation_text}`,
              partner: this.Main.users.cache.get(Data.partner)
                ? this.Main.users.cache.get(Data.partner).tag
                : language.pf.type.null,
            }),
            true
          );
        const profile_embed_two = new Discord.MessageEmbed()
          .setTitle(`**🏅 ${language.pf.embed.achievements}**`)
          .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
          .setColor('RANDOM');
        const profile_embed_three = new Discord.MessageEmbed()
          .setTitle(`**🏅 ${language.pf.embed.roles}**`)
          .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
          .setColor('RANDOM');
        let i = 1;
        member.roles.cache.size > 1
          ? member.roles.cache
              .sort((a, b) => b.position - a.position)
              .filter((role) => role.id !== message.guild.id)
              .forEach((role) => {
                profile_embed_three.addField('** **', `${role}`);
              })
          : profile_embed_three.setDescription('**Нету**');
        Data.Achievements >= 1
          ? Data.Achievements.forEach((Achievement) => {
              profile_embed_two.addField(
                `**${i++}.${Achievements[Achievement].name}|${
                  Achievements[Achievement].emoji
                }**`,
                `\n**${Achievements[Achievement].description}**`
              );
            })
          : profile_embed_two.setDescription('**Нету**');
        const pages = [profile_embed_one, profile_embed_two, profile_embed_three];
        message.channel
          .send(
            profile_embed_one.setFooter(
              language.pages.translate({ page, pages: pages.length })
            )
          )
          .then(async (msg) => {
            const reacted = await this.Main.utils.Reaction_Collector(
              await this.Main.utils.reaction(
                [
                  'arrow_left:756545499586101288',
                  'smart_button:756545499460272311',
                  'arrow_right:756545499393294368',
                ],
                msg,
                true
              ),
              msg,
              message.author,
              60000
            );
            reacted.on('collect', (reaction) => {
              switch (reaction.emoji.name) {
                case 'arrow_left':
                  page === 1 ? (page = pages.length) : page++;
                  msg.edit(
                    pages[page - 1].setFooter(
                      language.pages.translate({ page, pages: pages.length })
                    )
                  );
                  break;
                case 'smart_button':
                  msg.delete();
                  break;
                case 'arrow_right':
                  page === pages.length ? (page = 1) : page++;
                  msg.edit(
                    pages[page - 1].setFooter(
                      language.pages.translate({ page, pages: pages.length })
                    )
                  );
                  break;
              }
              if (message.guild.me.hasPermission('MANAGE_MESSAGES'))
                return reaction.users.remove(message.author.id);
            });
          });
        if (message.guild.me.hasPermission('MANAGE_MESSAGES'))
          return message.delete();
      } else
        return message.channel.send(
          this.Main.embeds.ErrEmbed.setDescription(language.noData)
        );
    } catch (error) {
      console.log(error);
    }
  }
};
