const Discord = require('discord.js');
const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['e'],
      category: 'development',
      public: false,
    });
  }

  async run(message, args) {
    const argss = args.join(' ');
    try {
      let evaled = await eval(argss);
      const eevaled = typeof evaled;
      const tyype = eevaled[0].toUpperCase() + eevaled.slice(1);
      if (typeof evaled !== 'string')
        evaled = require('util').inspect(evaled, { depth: 0 });
      evaled == (undefined || null)
        ? (evaled = `Empty response: ${evaled}`)
        : evaled;
      const embed = new Discord.MessageEmbed()
        .addField('Вход', `\`\`\`js\n${argss}\`\`\``)
        .addField(
          'Выход',
          `\`\`\`js\nType: ${tyype}\nDone for: ${`${
            new Date().getTime() - message.createdTimestamp
          }ms`}\`\`\``,
          true
        );
      evaled
        .chunk(999)
        .sort()
        .forEach((chunk) => {
          embed.addField('** **', `\`\`\`js\n${chunk}\`\`\``);
        });
      await message.channel.send(embed).then(() => message.react('✅'));
    } catch (err) {
      const embed = new Discord.MessageEmbed()
        .addField('Вход', `${argss}`)
        .addField('Выход', `\`\`\`js\nError ❎\n${err}\`\`\``, true);
      message.channel.send(embed).then(() => message.react('❎'));
    }
  }
};
