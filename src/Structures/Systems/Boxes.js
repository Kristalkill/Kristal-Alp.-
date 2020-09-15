const { MessageEmbed } = require('discord.js');

module.exports = class Boxes {
  constructor(Utils) {
    this.Main = Utils.Main;
    this.utils = Utils;
  }

  rn() {
    return Math.floor(Math.random() * 100);
  }

  example_generator(level) {
    const operator = {
      0: Math.random() > 0.5 ? '+' : '-',
      1: '*',
      2: '/',
      3: '%',
      4: `% ${this.rn()} ${
        [Math.random() > 0.5 ? '+' : '-', '*', '/'][
          Math.floor(Math.random() * 4)
        ]
      }`,
    };
    return `${this.rn()} ${operator[level]} ${this.rn()}`;
  }

  randombox(messages) {
    const boxes = ['C', 'U', 'R', 'E', 'L'];
    const chanche = (Math.random() * (messages ? messages / 100 : 100)).toFixed(
      0
    );
    let win;
    switch (true) {
      case chanche >= 80 && chanche < 90:
        win = boxes[0];
        break;
      case chanche >= 90 && chanche < 95:
        win = boxes[1];
        break;
      case chanche >= 95 && chanche < 98:
        win = boxes[2];
        break;
      case chanche >= 98 && chanche <= 99:
        win = boxes[3];
        break;
      case chanche > 99:
        win = boxes[4];
        break;
      default:
        return;
    }
    return win;
  }

  spawnrandombox(messag) {
    const boxes = ['C', 'U', 'R', 'E', 'L'];
    const win = this.randombox();
    if (!win) return;
    let i;
    const example = this.example_generator(boxes.indexOf(win));
    const result = eval(example);
    messag.channel
      .send(
        new MessageEmbed()
          .setTitle(`Появилась ${win} коробка!`)
          .setDescription(
            `Напишите ответ **${messag.guild.settings.Moderation.prefix}pick ${example}**!`
          )
          .setColor('GREEN')
          .setTimestamp()
      )
      .then((message) => {
        this.Main.db.boxescoldown.add(messag.guild.id);
        const collector = messag.channel.createMessageCollector(
          (m) => !m.author.bot,
          { time: 15000 }
        );
        collector.on('collect', (msg) => {
          if (
            msg.content.toLowerCase() ===
            `${messag.guild.settings.Moderation.prefix}pick ${result}`
          ) {
            message.edit(
              new MessageEmbed()
                .setTitle(`Коробка \`${win}\` собрана!`)
                .setDescription(
                  `Коробка \`${win}\` была собрана участником ${msg.author}.`
                )
                .setColor('BLURPLE')
                .setTimestamp()
            );
            message.delete({ timeout: 10000 });
            message.channel.send(
              `[Коробка]: Коробка \`${win}\` досталась участнику ${msg.author}!`
            );
            message.guild.member(msg.author).options.box[win]++;
            i = 1;
            collector.stop();
          }
        });
        collector.on('end', () => {
          setTimeout(() => {
            this.Main.db.boxescoldown.delete(message.guild.id);
          }, 405000);
          if (i == 1) return;
          message.channel.send(
            new MessageEmbed()
              .setTitle('Время вышло.')
              .setDescription(
                `Коробка редкостью \`${win}\` не была никем собрана.\nОтвет на пример: **${result}**`
              )
              .setColor('RED')
              .setTimestamp()
          );
        });
      });
  }
};
