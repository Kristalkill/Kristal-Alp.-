const Command = require('../../Structures/Command');

module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: ['shel'],
      category: 'development',
      public: false,
    });
  }

  async run(message, args) {
    message.channel
      .send('Я обробатываю...!!!!')
      .then((msg) =>
        msg.edit(
          require('child_process').execSync(args.join(' ')).toString('utf8') +
            ' '
        )
      );
  }
};
