const Discord = require('discord.js');
const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['sbot'],
      category: 'development',
      public: false,
    });
  }

  async run(message) {
    try {
      const Exitembed = new Discord.MessageEmbed()
        .setTitle('Я успешно офнулся')
        .setDescription('EMINEM-FRAMED');
      message.channel.send(Exitembed);
      await process.exit();
    } catch (error) {
      console.log(error);
    }
  }
};
