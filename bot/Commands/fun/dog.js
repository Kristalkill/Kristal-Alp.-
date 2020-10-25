const {
    MessageEmbed
} = require('discord.js');
const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['dog'],
            category: 'fun',
        });
    }

    async run(message) {
        message.channel.send(new MessageEmbed()
            .setImage(await this.fetch('https://random.dog/woof.json'))
            .setColor("#2f3136")
            .setTimestamp())
    }
}