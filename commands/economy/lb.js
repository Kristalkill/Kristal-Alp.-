module.exports = {
    name: 'lb',
    description: 'Топы пользователей',
    aliases: ["leaders"],
    public: true,
    async execute(Main, message, args) {
    User.find({guildID:message.guild.id}).sort([['money','descending','guildID']]).exec((err,res)=> {
    let embed = new Discord.MessageEmbed().setColor(config.color)
    if(res.length === 0){embed.setDescription('К сожелению таблица данного сервера пуста.') }
    else if (res.length < 10){ for(i = 0; i < res.length; i++){
        let name = Main.users.cache.get(res[i].userID).tag || "Неизвестно"
        if(name == "Неизвестно"){
            embed.addField(`${i + 1}. ${name}`,`**Копеек**: ${res[i].money}💸`)
        }else{
            embed.addField(`${i + 1}. ${name}`,`**Копеек**: ${res[i].money}💸`)
        }
    }
    }else{
    for(i = 0; i < 10; i++){
        let name = Main.users.cache.get(res[i].userID).tag || "Неизвестно"
        if(name == "Пусто"){
            embed.addField(`${i + 1}. ${name}`,`**Копеек**: ${res[i].money}💸`)
        }else{
            embed.addField(`${i + 1}. ${name}`,`**Копеек**: ${res[i].money}💸`)
        }
    }
    }
    message.channel.send(embed)
  });
    }
}
