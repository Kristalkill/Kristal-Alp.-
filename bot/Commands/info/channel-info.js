const {
    MessageEmbed
} = require('discord.js');
const Command = require('../../Structures/Construction/Command');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {});
    }
    async run(message, args) {
        let channel = message.guild.channels.cache.get(message.mentions.channels.first() || message.guild.channels.cache.get(args.join(' ')) || message.guild.channels.cache.find(r => r.name === args.join(' ')));
        if (!channel) return this.Embed.ErrorEmbed(`Provide channel`, message)
        message.channel.send(new MessageEmbed()
            .setTitle(`Channel Info`)
            .setDescription(`Name: ${channel.name}
            ID: \`${channel.id}\`
            Type: ${channel.type}
            RateLimit: \`${channel.rateLimitPerUser || 0 }\`
            Parent: ${channel.parent ? channel.parent.name : "None"}
            Topic: ${channel.topic|| "None"}`)
            .setTimestamp());
    }
}