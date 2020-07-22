const { DiscordAPIError } = require("discord.js");

let embed = new Discord.MessageEmbed()
.setTitle(`ГОЛОСОВАНИЕ`)
.setFooter(message.author.tag)
.setDescription
module.exports = {
    name: 'poll',
    description: 'poll',
    aliases: ["poll"],
    public: true,
    async execute(Main, message, args) {
        if (!args) return message.reply(ErrEmbed.setDescription("Напишите за что голосовать!"))
        const pollTopic = await message.channel.send(embed.setDescription(message.content.slice(2)));
        await pollTopic.react(`✅`);
        await pollTopic.react(`⛔`);
    }
}