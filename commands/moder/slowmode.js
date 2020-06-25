module.exports = {
    name: "slowmode",
    description: "Слов мод.",
    aliases: [],
    public: true,
    async execute(Main, message, args) {
        let member =  message.guild.member(message.author);
        if(!config.owner.includes(message.author.id)&&(!member.hasPermission('MANAGE_CHANNELS')))return message.reply(ErrEmbed.setDescription(`**У вас нету прав** ${`\`MANAGE_MESSAGES\``}`));
        if(!message.guild.me.hasPermission('MANAGE_CHANNELS'))return message.reply(ErrEmbed.setDescription(`**У меня нету прав** ${`\`MANAGE_CHANNELS\``}`))
        if(!args[0]||!parseInt(args[0]))return message.reply(ErrEmbed.setDescription('Веддите число'))
        if(!ms(args[0])/1000 < 21600000)return message.reply(ErrEmbed.setDescription('Максимальное время слоумода 6 часов'))
        else{
            message.channel.setRateLimitPerUser(ms(args[0])/1000)
            message.channel.send(OKEmbed.setDescription(`Slowmode в ${message.channel} установлен на ${`\`${args[0]}\``}`))
        }
    }
}