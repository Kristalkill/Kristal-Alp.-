module.exports = {
    name: 'poll',
    description: 'poll',
    aliases: ["poll"],
    public: true,
    async execute(Main, message, args) {
        let embed = new Discord.MessageEmbed()
.setTitle(`ГОЛОСОВАНИЕ`)
.setFooter(message.author.tag)
        if (!args) return message.reply(ErrEmbed.setDescription("Напишите за что голосовать!"))
        const pollTopic = await message.channel.send(embed.setDescription(args.join(' ')));
        await pollTopic.react(`✅`);
        await pollTopic.react(`⛔`);
    }
}