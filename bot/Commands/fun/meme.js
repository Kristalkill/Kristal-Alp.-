const {
    MessageEmbed
} = require('discord.js');
const Command = require('../../Structures/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {});
    }

    async run(message) {
        message.channel.send(new MessageEmbed()
            .setAuthor(`${message.author.username1}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setTitle(`meme`)
            .setImage(
                await fetch('https://meme-api.herokuapp.com/gimme')
                .then((r) => r.json())
                .then((r) => r.image)
            )
            .setColor("RANDOM")
            .setTimestamp())
    }
}