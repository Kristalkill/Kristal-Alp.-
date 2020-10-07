const { MessageEmbed } = require('discord.js');
var lim = 100;
var ops = {
  '+': [],
  '-': [],
  '*': [],
  '/': [],
  '%': [],
};

var byRes = {
  '+': Array(lim + 1),
  '-': Array(lim + 1),
  '*': Array(lim + 1),
  '/': Array(lim + 1),
  '%': Array(lim + 1),
};
var fs = {
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
function randof(...arrs) {
  var len = arrs.reduce((r, a) => r + a.length, 0);
  var i = (Math.random() * len) | 0;
  return arrs.find((a) => i < a.length || ((i -= a.length), false))[i];
}
~(function prepare() {
  for (var x = 1; x <= lim; ++x) {
    for (var y = 1; y <= lim; ++y) {
      for (let op of Object.keys(fs)) {
        let res = fs[op](x, y);
        if (res >= 1 && res <= lim && res === ~~res) {
          ops[op].push([op, x, y]);
          void (byRes[op][res] = byRes[op][res] || []).push([op, x, y]);
        }
      }
    }
  }

  var missing = 0;

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
module.exports = class Boxes {
  constructor(Utils) {
    this.Main = Utils.Main;
    this.utils = Utils;
  }
  generate(lev) {
    var simpleLevels = [
      [ops['+'], ops['-']],
      [ops['*']],
      [ops['/']],
      [ops['%']],
    ];
    if (lev < simpleLevels.length) {
      var [op, x, y] = randof(...simpleLevels[lev]);
      return [fs[op](x, y), `${x} ${op} ${y}`];
    }

    var lev2 = 0;
    var levOp1 = '*/%'[lev - simpleLevels.length];

    while (1) {
      var [op2, l, z] = randof(...simpleLevels[lev2]);

      if (!byRes[levOp1][l]) {
        console.log(`Попитка на уровне ${lev}`); // Очень редко
        continue;
      }

      var [op1, x, y] = randof(byRes[levOp1][l]);
      return [fs[op2](fs[op1](x, y), z), `${x} ${op1} ${y} ${op2} ${z}`];
    }
  }
  randombox(messages) {
    return 'CCCCCCCCCCCCCCCCCCCUUUUUUUUUURRRRRRREEL'[
      ((Math.random() * (messages ? messages / 100 : 100)).toFixed(0) - 60) | 0
    ];
  }
  async spawnrandombox(messag) {
    const boxes = ['C', 'U', 'R', 'E', 'L'];
    const win = this.randombox();
    if (!win) return;
    let i;
    const [result, example] = this.generate(boxes.indexOf(win));
    await messag.channel
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
        const collector = message.channel.createMessageCollector(
          (m) => !m.author.bot,
          { time: 15000 }
        );
        collector.on('collect', (msg) => {
          if (
            msg.content.toLowerCase() ===
            `${messag.guild.settings.Moderation.prefix}pick ${result}`
          ) {
            message
              .edit(
                new MessageEmbed()
                  .setTitle(`Коробка \`${win}\` собрана!`)
                  .setDescription(
                    `Коробка \`${win}\` была собрана участником ${msg.author}.`
                  )
                  .setColor('BLURPLE')
                  .setTimestamp()
              )
              .then((m) => {
                m.delete({ timeout: 10000 });
              });
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
