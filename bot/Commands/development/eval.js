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
    const argument = args.join(' ');
    try {
      let evaled = await eval(argument);
      const type_evaled = typeof evaled;
      const typo = type_evaled[0].toUpperCase() + type_evaled.slice(1);
      if (typeof evaled !== 'string')
        evaled = require('util').inspect(evaled, { depth: 0 });
      evaled === null
        ? (evaled = `Empty response: ${evaled}`)
        : evaled;
      const embed = new Discord.MessageEmbed()
        .addField('Вход', `\`\`\`js\n${arguments}\`\`\``)
        .addField(
          'Выход',
          `\`\`\`js\nType: ${typo}\nDone for: ${`${
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
        .addField('Вход', `${argument}`)
        .addField('Выход', `\`\`\`js\nError ❎\n${err}\`\`\``, true);
      message.channel.send(embed).then(() => message.react('❎'));
    }
  }
};
