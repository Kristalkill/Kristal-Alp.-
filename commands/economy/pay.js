module.exports = {
    name: 'pay',
    description: 'Передать монетки другому юзеру',
    aliases: ["give"],
    public: true,
    async execute(Mine, message, args) {
    let member =  message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first() || message.guild.members.cache.get(args[3]));
    if(!member) return  message.channel.send(ErrEmbed.setDescription(`Пользователь не был найден.`))
    if(!args[1]) return  message.channel.send(ErrEmbed.setDescription(`Укажите количество монет которых хотите отдать.`))
    if(args[1] < 1) return  message.channel.send(ErrEmbed.setDescription(`Нельзя передать такое количество монет`))
    if(isNaN(args[1])) return  message.channel.send(ErrEmbed.setDescription(`Укажите корректное значение.`))
    User.findOne({guildID: message.guild.id, userID: message.author.id},(err,loc) => {
    User.findOne({guildID: message.guild.id, userID: member.id},(err,data) => {
        if(!data){
            let errorMess = new Discord.MessageEmbed()
            .setColor('RED')
            .setDescription(`К сожелению **${member.user.tag}** нету в базе-данных.`)
            return message.channel.send(errorMess)
        }else{

            if(loc.money < args[1]) return  message.channel.send(ErrEmbed.setDescription(`У вас нету такого количества монет.`))
            if(loc.userID == member.id) return  message.channel.send(ErrEmbed.setDescription(`Вы не можете передать монеты самому себе!`))
            if(member.user.bot) return  message.channel.send(ErrEmbed.setDescription(`Боты не люди.`))

            let embed = new Discord.MessageEmbed()
            .setColor(config.color)
            .setDescription(`**${message.author.username}** успешно передал **${member.user.username}** монетки в количестве ${args[1]}`)
            loc.money -= Math.floor(parseInt(args[1]));
            data.money += Math.floor(parseInt(args[1]));
            loc.save(); data.save()
            message.channel.send(embed)
                }
            })
        })
    }
}
