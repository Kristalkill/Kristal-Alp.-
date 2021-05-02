const lim = 100;
const ops = {
  '+': [],
  '-': [],
  '*': [],
  '/': [],
  '%': [],
};

const byRes = {
  '+': Array(lim + 1),
  '-': Array(lim + 1),
  '*': Array(lim + 1),
  '/': Array(lim + 1),
  '%': Array(lim + 1),
};
const fs = {
  '+'(x, y) {
    return x + y;
  },
  '-'(x, y) {
    return x - y;
  },
  '*'(x, y) {
    return x * y;
  },
  '/'(x, y) {
    return x / y;
  },
  '%'(x, y) {
    return x % y;
  },
};

function random_of(...array) {
  const len = array.reduce((r, a) => r + a.length, 0);
  let i = (Math.random() * len) | 0;
  return array.find((a) => i < a.length || ((i -= a.length), false))[i];
}

~(function prepare() {
  for (let x = 1; x <= lim; ++x) {
    for (let y = 1; y <= lim; ++y) {
      for (let op of Object.keys(fs)) {
        let res = fs[op](x, y);
        if (res >= 1 && res <= lim && res === ~~res) {
          ops[op].push([op, x, y]);
          void(byRes[op][res] = byRes[op][res] || []).push([op, x, y]);
        }
      }
    }
  }

  let missing = 0;

  for (let res = 1; res <= lim; ++res) {
    for (let op of Object.keys(byRes)) {
      if (!(res in byRes[op])) {
        console.log(`Низя получить ${res} используя '${op}'`);
        ++missing;
      }
    }
  }

  if (missing > 3) {
    throw new Error('Что-то не так нужно переделать алгоритм');
  }
})();
let {
  MessageEmbed
} = require('discord.js');
module.exports = class Boxes {
  constructor(Utils) {
    this.Main = Utils.Main;
    this.utils = Utils;
  }
  generate(lev) {
    const simpleLevels = [
      [ops['+'], ops['-']],
      [ops['*']],
      [ops['/']],
      [ops['%']],
    ];
    if (lev < simpleLevels.length) {
      let [op, x, y] = random_of(...simpleLevels[lev]);
      return [fs[op](x, y), `${x} ${op} ${y}`];
    }

    const lev2 = 0;
    const levOp1 = '*/%' [lev - simpleLevels.length];
    let [op2, l, z] = random_of(...simpleLevels[lev2]);

    if (!byRes[levOp1][l]) {
      console.log(`Попитка на уровне ${lev}`); // Очень редко
    }

    let [op1, x, y] = random_of(byRes[levOp1][l]);
    return [fs[op2](fs[op1](x, y), z), `${x} ${op1} ${y} ${op2} ${z}`];
  }
  random_box(messages) {
    return 'CCCCCCCCCCCCCCCCCCCUUUUUUUUUURRRRRRREEL' [
      ((Math.random() * (messages ? messages / 100 : 100)).toFixed(0) - 60) | 0
    ];
  }
  async spawn_random_box(main_message) {
    const boxes = ['C', 'U', 'R', 'E', 'L'];
    const win = this.random_box();
    if (!win) return;
    let i;
    const [result, example] = this.generate(boxes.indexOf(win));
    await main_message.channel
      .send(
        new MessageEmbed()
        .setTitle(`Появилась ${win} коробка!`)
        .setDescription(
          `Напишите ответ **${main_message.guild.settings.Moderation.prefix}pick ${example}**!`
        )
        .setColor('GREEN')
        .setTimestamp()
      )
      .then((message) => {
        this.Main.db.boxescoldown.add(main_message.guild.id);
        const collector = message.channel.createMessageCollector(
          (m) => !m.author.bot, {
            time: 15000
          }
        );
        collector.on('collect', (msg) => {
          if (
            msg.content.toLowerCase() ===
            `${main_message.guild.settings.Moderation.prefix}pick ${result}`
          ) {
            message
              .edit(
                new MessageEmbed()
                .setTitle(`Коробка \`${win}\` собрана!`)
                .setDescription(
                  `Коробка \`${win}\` была собрана участником ${msg.author}.`
                )
                .setColor('0x7289da')
                .setTimestamp()
              )
              .then((m) => {
                m.delete({
                  timeout: 10000
                });
              });
            message.channel.send(
              `[Коробка]: Коробка \`${win}\` досталась участнику ${msg.author}!`
            );
            msg.member.options.box[win]++;
            i = 1;
            collector.stop();
          }
        });
        collector.on('end', () => {
          setTimeout(() => {
            this.Main.db.boxescoldown.delete(message.guild.id);
          }, 405000);
          if (i === 1) return;
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