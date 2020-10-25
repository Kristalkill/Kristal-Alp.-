const {
    MessageEmbed
} = require('discord.js');
const Command = require('../../Structures/Construction/Command');

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
            .setImage(await this.fetch('https://meme-api.herokuapp.com/gimme'))
            .setColor("RANDOM")
            .setTimestamp())
    }
}