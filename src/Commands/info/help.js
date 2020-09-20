const fs = require('fs');
const Discord = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['help'],
      description: 'help',
      category: 'info',
    });
  }

  async run(message, args) {
    try {
      const emojis = {
        economy: '<a:Coin:756933210864353471>',
        fun: '<a:Tada:756936421763448935>',
        info: ':bookmark_tabs:',
        moder: '<a:Judge_hammer:756940860616081569>',
        music: '<a:Music_Note:756941238405562370>',
        setting: '<a:Gears:756941869325352962>',
      };
      const language = require(`../../languages/${
        message.guild.settings.Moderation.language || 'en'
      }.json`);

      const cmd = args[0] ? args[0].toLowerCase() : 'null';
      const command =
        this.Main.commands.get(cmd) ||
        this.Main.commands.get(this.Main.aliases.get(cmd));
      if (!command || command.public === false) {
        const pages1 = [];
        const pages = [];
        let page = 1;
        fs.readdirSync(`src/Commands/`)
          .filter((module) => module != 'development')
          .forEach((module) => {
            pages1.push(`≫ ${emojis[module]} | ${module.capitalize()} ≪`);
            if (
              this.Main.commands.filter((cmd) => cmd.category == module).size >=
              1
            )
              return pages.push(
                `${this.Main.commands
                  .filter((cmd) => cmd.category == module)
                  .map(
                    (cmd) =>
                      `**\`${message.guild.settings.Moderation.prefix}${
                        cmd.name
                      }\`** - ${
                        language[cmd.name].command.description ||
                        language.undefined
                      }`
                  )
                  .join(`\n`)}`
              );
          });
        const embed = new Discord.MessageEmbed()
          .setColor(0xff5500)
          .setDescription(pages[page - 1])
          .setTitle(pages1[page - 1])
          .setFooter(`Page ${page} of ${pages.length}`);
        message.channel.send(embed).then(async (msg) => {
          const reacted = await this.Main.utils.promptMessage(
            msg,
            message.author,
            60000,
            [
              'rewind:756545499238236272',
              'arrow_left:756545499586101288',
              'smart_button:756545499460272311',
              'arrow_right:756545499393294368',
              'fast_forward:756545499539964144',
            ]
          );
          reacted.on('collect', (reaction) => {
            switch (reaction.emoji.name) {
              case 'rewind':
                page = 1;
                msg.edit(
                  embed
                    .setDescription(pages[page - 1])
                    .setTitle(pages1[page - 1])
                    .setFooter(
                      language.pages.translate({ page, pages: pages.length })
                    )
                );
                break;
              case 'arrow_left':
                page == 1 ? (page = pages.length) : page--;
                msg.edit(
                  embed
                    .setDescription(pages[page - 1])
                    .setTitle(pages1[page - 1])
                    .setFooter(
                      language.pages.translate({ page, pages: pages.length })
                    )
                );
                break;
              case 'smart_button':
                msg.delete();
                break;
              case 'arrow_right':
                page == pages.length ? (page = 1) : page++;
                msg.edit(
                  embed
                    .setDescription(pages[page - 1])
                    .setTitle(pages1[page - 1])
                    .setFooter(
                      language.pages.translate({ page, pages: pages.length })
                    )
                );
                break;
              case 'fast_forward':
                page = pages.length;
                msg.edit(
                  embed
                    .setDescription(pages[page - 1])
                    .setTitle(pages1[page - 1])
                    .setFooter(
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
          new Discord.MessageEmbed().setTitle(command.name).setDescription(
            language.help.param.translate({
              nsfw: command.nsfw,
              category: command.category,
              aliases: command.aliases,
              usage: language[command.name].command.usage || language.undefined,
              description:
                language[command.name].command.description ||
                language.undefined,
            })
          )
        );
    } catch (error) {
      console.log(error);
    }
  }
};
