const { MessageEmbed } = require('discord.js');

module.exports = class Boxes {
  constructor(Utils) {
    this.Main = Utils.Main;
    this.utils = Utils;
  }

  rn(lvl = this.utils.randomize(0, 4)) {
    const oper = {
      0: 100,
      1: 10,
      2: 10,
      3: 4,
      4: 4,
    };
    return Math.floor(Math.random() * oper[lvl]);
  }

  example_generator(level) {
    const operator = {
      0: Math.random() > 0.5 ? '+' : '-',
      1: '*',
      2: '/',
      3: '%',
      4: `% ${this.rn(3)} ${
        [Math.random() > 0.5 ? '+' : '-', '*', '/'][
          Math.floor(Math.random() * 4)
        ]
      }`,
    };
    return `${this.rn()} ${operator[level]} ${this.rn()}`;
  }

  randombox(messages) {
    const boxes = ['C', 'U', 'R', 'E', 'L'];
    const chanche = this.utils
      .randomize(0, messages ? messages / 100 : 100)
      .toFixed(0);
    let win;
    switch (true) {
      case chanche >= 15 && chanche < 10:
        win = boxes[0];
        break;
      case chanche >= 10 && chanche < 6:
        win = boxes[1];
        break;
      case chanche >= 6 && chanche < 3:
        win = boxes[2];
        break;
      case chanche >= 3 && chanche < 1:
        win = boxes[3];
        break;
      case chanche >= 1:
        win = boxes[4];
        break;
      default:
        return;
    }
    return win;
  }

  spawnrandombox(message) {
    const boxes = ['C', 'U', 'R', 'E', 'L'];
    const win = this.randombox();
    if (!win) return;
    let i;
    const example = this.example_generator(boxes.indexOf(win));
    const result = eval(example);
    message.channel
      .send(
        new MessageEmbed()
          .setTitle(`Появилась ${win} коробка!`)
          .setDescription(
            `Напишите ответ **${message.guild.settings.Moderation.prefix}pick ${example}**!`
          )
          .setColor('GREEN')
          .setTimestamp()
      )
      .then((message) => {
        const collector = message.channel.createMessageCollector(
          (m) => !m.author.bot,
          { time: 15000 }
        );
        collector.on('collect', (msg) => {
          if (
            msg.content.toLowerCase() ===
            `${message.guild.settings.Moderation.prefix}pick ${result}`
          ) {
            message
              .edit(
                new MessageEmbed()
                  .setTitle(`Коробка \`${win}\` собрана!`)
                  .setDescription(
                    `Коробка \`${win}\` была собрана участником ${message.author}.`
                  )
                  .setColor('BLURPLE')
                  .setTimestamp()
              )
              .then((msg) => msg.delete(10000));
            msg.channel.send(
              `[Коробка]: Коробка \`${win}\` досталась участнику ${message.author}!`
            );
            msg.guild.member(message.author).options.box[win]++;
            msg.guild.member(message.author).options.save();
            collector.stop();
            i = 1;
          }
        });
      });
    setTimeout(() => {
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
    }, 15000);
  }
};
