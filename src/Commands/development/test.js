const Command = require('../../Structures/Command');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['test'],
			category: 'development',
             public: false
		});
    }
    async run(message) {
const reacted =  await this.Main.utils.promptMessage(message, message.author, 60000, ['⬅️','➡️'])
      reacted.on('collect', reaction => {
        switch(reaction.emoji.name){
          case '⬅️':
             message.channel.send(`1`)
            break;
          case '➡️':
              message.channel.send(`2`)
            break;
        }
      })
}
}