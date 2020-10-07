const {
    MessageEmbed
} = require('discord.js');
const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['cat'],
            category: 'fun',
        });
    }

    async run(message) {
        let embed = new MessageEmbed()
            .setImage(await fetch('https://some-random-api.ml/img/cat')
                .then((r) => r.json())
                .then((r) => r.image))
            .setColor("#2f3136")
        message.channel.send(embed);
    }
}