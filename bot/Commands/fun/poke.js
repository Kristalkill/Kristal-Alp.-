const {
    MessageEmbed
} = require('discord.js');
const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {});
    }

    async run(message, args) {
        const language = require(`../../languages/${
            message.guild.settings.Moderation.language || 'en'
          }.json`);

        const member = message.guild.member(
            message.mentions.users
            .filter((u) => u.id != message.guild.me.id)
            .first() || message.guild.members.cache.get(args[0])
        );
        if (!member)
            return message.channel.send(
                this.Main.embeds.ErrEmbed.setDescription(language.nomember)
            );
        message.channel.send(new MessageEmbed()
            .setColor("#ff69fc")
            .setDescription(`${message.author.username} poke ${member.user.username}`)
            .setImage(
                await fetch('https://nekos.life/api/v2/img/poke')
                .then((r) => r.json())
                .then((r) => r.url)
            ))
    }
}