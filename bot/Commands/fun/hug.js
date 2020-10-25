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
        const member = this.get(user, message, 'members')
        if (!member) this.Embed.ErrorEmbed(language.nomember, message)
        message.channel.send(new MessageEmbed()
            .setColor("#ff69fc")
            .setDescription(`${message.author.username} hugs ${message.member.user.username}`)
            .setImage(await this.fetch('https://nekos.life/api/v2/img/hug'))
            .setTimestamp()
        )
    }
}