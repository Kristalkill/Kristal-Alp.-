module.exports = {
    name1: 'invite',
    aliases: ['invite'],
    description_en: 'Links to the bot',
    description_ru: 'Ссылки на бота',
    usages: [],
    uses: 0,
    category: 'info',
    cooldown: 1000,
    disabled: true,
    ownerOnly: true,
    async run(bot, message, args) {
        let deni = '637922489921699841'
        const Discord = require("discord.js")
        let lang = require(`../../languages/lang_${guild.lang}.json`);
        let evaled = eval('`' + lang.link + '`');
        let msgs = evaled.split('<>');
        let invite = await bot.generateInvite(8);
        let invitenopermissions = await bot.generateInvite(2146958847);
        let embed = new Discord.MessageEmbed()
            .setAuthor(`${message.author.username1}`, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setDescription(`
    **Привет! Я ${bot.user.username1}**
    Хотите знать больше чем остальные? В категории информации вы можете узнать от информации о канале до аватара. Нашли человека , который часто нарушает? Зарепортите его и на сервере он больше не появится! Но самое главное , это поддержка 2 языков , русского и английского! Узнай больше, пригласив меня!`)
            .addField(`Пригласить`, `1.[Все права](${invite}) (Рекомендуем)
    2.[Выбрать права](${invitenopermissions}) (Не рекомендуется)`, true)
            .addField(`Поддержка`, `
    1.[Discord](discord)`, true)
            .addField(`Донат`, `
    1.[Qiwi](https://qiwi.me/sakurapremium)
    2.Qiwi +79033717030`, true)
            .addField(`Проголосовать`, `
    1.[sdcbots](https://bots.server-discord.com/706164173763248159)
    2.[serversbots](https://server-discord.com/706213781486960641)
    3.[DSM](https://discordserver.info/706213781486960641)`, true)
            .setFooter(`${bot.users.cache.get(deni).tag} ©️ 2020 Все права защищены!`, `${bot.users.cache.get(deni).displayAvatarURL({dynamic: true})}`)
        message.channel.send(embed)
    }
}