const Discord = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['rps'],
      category: 'economy',
    });
  }

  async run(message, args) {
    try {
      const language = require(`../../languages/${
        message.guild.settings.Moderation.language || 'en'
      }.json`);
      if (!args[0])
        return message.reply(
          this.Main.embeds.ErrEmbed.setDescription(
            language.rps.params.minmalbet
          )
        );
      const bet = this.Main.utils.toNum(args[0]);
      if (bet < 1)
        return message.reply(
          this.Main.embeds.ErrEmbed.setDescription(
            language.rps.params.minmalbet
          )
        );
      if (bet * 2 > message.member.options.money.money)
        return message.reply(
          this.Main.embeds.ErrEmbed.setDescription(
            language.rps.params.nohavemoney
          )
        );
      const chooseArr = ['🗻', '🤚', '✌️'];
      const embed = new Discord.MessageEmbed()
        .setColor('#ffffff')
        .setFooter(
          message.guild.me.displayName,
          this.Main.user.displayAvatarURL()
        )
        .setDescription(language.rps.params.emoji)
        .setTimestamp();
      const m = await message.channel.send(embed);
      const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];
      const reacted =
        (await this.Main.utils
          .promptMessage(m, message.author, 60000, chooseArr, 1, true)
          .then(
            (collected) => collected.first() && collected.first().emoji.name
          )) || botChoice;
      if (
        (reacted === '🗻' && botChoice === '✌️') ||
        (reacted === '🤚' && botChoice === '🗻') ||
        (reacted === '✌️' && botChoice === '🤚')
      ) {
        embed.setTitle(language.rps.params.win);
        embed.setDescription(
          language.rps.params.wintext.translate({
            emojis: `${reacted}/${botChoice}`,
            win: bet * 2,
          })
        );
        m.edit(embed);
        message.member.options.money += bet * 2;
      } else if (reacted === botChoice) {
        embed.setTitle(language.rps.params.draw);
        embed.setDescription(
          language.rps.params.dreawtext.translate({
            emojis: `${reacted}/${botChoice}`,
          })
        );
        m.edit(embed);
      } else {
        embed.setTitle(language.rps.params.lose);
        embed.setDescription(
          language.rps.params.losetext.translate({
            emojis: `${reacted}/${botChoice}`,
            lose: bet * 2,
          })
        );
        m.edit(embed);
        message.member.options.money -= bet * 2;
      }
    } catch (error) {
      console.log(error);
    }
  }
};
