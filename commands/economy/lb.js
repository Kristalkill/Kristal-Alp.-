abbreviateNumber = require('../../functions/abbreviateNumber.js')
ErrEmbed = require('../../embeds/ErrEmbed.js')
module.exports = {
    name: 'lb',
    description: 'Топы пользователей',
    aliases: ["leaders"],
    public: true,
    async execute(Main, message, args) {
      let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
switch (args[0]) {
case 'money':
    User.find({guildID:message.guild.id}).sort([['money','descending','guildID']]).exec((err,res)=> {
    if(res.length === 0){embed.setDescription('К сожелению таблица данного сервера пуста.') }
    else if (res.length < 10){ for(i = 0; i < res.length; i++){
        let name = Main.users.cache.get(res[i].userID).tag || "Неизвестно"
        if(name == "Неизвестно"){
            embed.addField(`${i + 1}. ${name}`,`**Денег**: ${abbreviateNumber(res[i].money)}💸`)
        }else{
            embed.addField(`${i + 1}. ${name}`,`**Денег**: ${abbreviateNumber(res[i].money)}💸`)
        }
    }
    }else{
    for(i = 0; i < 10; i++){
        let name = Main.users.cache.get(res[i].userID).tag || "Неизвестно"
        if(name == "Пусто"){
            embed.addField(`${i + 1}. ${name}`,`**Денег**: ${abbreviateNumber(res[i].money)}💸`)
        }else{
            embed.addField(`${i + 1}. ${name}`,`**Денег**: ${abbreviateNumber(res[i].money)}💸`)
        }
    }
    }
    message.channel.send(embed)

  })
break;
case 'level'||'lvl':
      User.find({guildID:message.guild.id}).sort([['level','descending','guildID']]).exec((err,res)=> {

      if(res.length === 0){embed.setDescription('К сожелению таблица данного сервера пуста.') }
      else if (res.length < 10){ for(i = 0; i < res.length; i++){
          let name = Main.users.cache.get(res[i].userID).tag || "Неизвестно"
          if(name == "Неизвестно"){
              embed.addField(`${i + 1}. ${name}`,`**Уровень**: ${abbreviateNumber(res[i].level)}:beginner: `)
          }else{
              embed.addField(`${i + 1}. ${name}`,`**Уровень**: ${abbreviateNumber(res[i].level)}:beginner: `)
          }
      }
      }else{
      for(i = 0; i < 10; i++){
          let name = Main.users.cache.get(res[i].userID).tag || "Неизвестно"
          if(name == "Пусто"){
              embed.addField(`${i + 1}. ${name}`,`**Уровень**: ${abbreviateNumber(res[i].level)}:beginner: `)
          }else{
              embed.addField(`${i + 1}. ${name}`,`**Уровень**: ${abbreviateNumber(res[i].level)}:beginner: `)
          }
      }
      }
      message.channel.send(embed)
    })
break;
    }
}
}
