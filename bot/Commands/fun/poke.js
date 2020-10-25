const {
    MessageEmbed
} = require('discord.js');
const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {});
    }

    async run(message, [user]) {
        const language = this.language(message.guild.settings.Moderation.language)
        const member = this.get(user, message, 'members', false)
        if (!member) return this.Embed.ErrorEmbed(message, language.nomember)
        message.channel.send(new MessageEmbed()
            .setColor("#ff69fc")
            .setDescription(`${message.author.username} poke ${member.user.username}`)
            .setImage(await this.fetch('https://nekos.life/api/v2/img/poke')))
    }
}