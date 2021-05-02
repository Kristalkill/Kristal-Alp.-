const Command = require('../../Structures/Construction/Command');
const {MessageEmbed} = require("discord.js");

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
      message.channel.send(new MessageEmbed()
          .setTitle('Я успешно офнулся')
          .setDescription('EMINEM-FRAMED'));
      await process.exit();
    } catch (error) {
      console.log(error);
    }
  }
};
