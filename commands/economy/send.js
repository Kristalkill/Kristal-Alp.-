module.exports = {
    name: 'send',
    description: 'Напишу потом',
    aliases: ["send"],
    public: true,
     async execute (Main, message, args,res) {
        const MarryEmbed = new Discord.MessageEmbed()
        const member = message.mentions.users.filter(u=>u.id != message.guild.me.id).first()  || message.guild.members.cache.get(args[1])
        if (!member)return  message.channel.send('Укажите пользователя');
        User.findOne({guildID: message.guild.id, userID:message.author.id},(err,Data) => {
        User.findOne({guildID: message.guild.id, userID:member.id},(err,Data1) => {
        if ((Data.level||Data1.level) < res.Economy.Partner.level) return  message.channel.send(`У вас или у вашего партнера нету ${res.Economy.Partner.level} уровня`);
        if (Data.money < res.Economy.Partner.level)return  message.channel.send(`Для отправки предложения надо ${res.Economy.Partner.level}`);
        if ((Data.partner||Data1.partner)!= '0')return  message.channel.send('У вас или у игрока уже есть партнер');
        if (!Data1)return  message.channel.send('Пользователь не найден в базе данных');
        if (Data.sended != '0')return  message.channel.send(`Вы уже оправили запрос! Для отмены используйте ${res.Moderation.prefix}partner cancel`);
        if (Data.senders.indexOf(message.author.id) != -1)return  message.channel.send(`Вы уже отправили запрос этому человеку`);
        if (Data1.senders.split(',') >= 5)return  message.channel.send('Пользователь уже имеет максимальное количество предложений');
        Data1.senders += `,${message.author.id}`
        Data.sended = member.id
        Data.save()
        Data1.save();
        MarryEmbed.setTitle(`Вы успешно отправили предложение ${member.tag}`);
        message.channel.send(MarryEmbed)
        })
})
}}