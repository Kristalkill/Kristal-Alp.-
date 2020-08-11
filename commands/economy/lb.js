abbreviateNumber = require('../../functions/abbreviateNumber.js')
module.exports = {
    name: 'lb',
    description: 'Топы пользователей',
    aliases: ["leaders"],
    Permission:[],
    public: true,
    async execute(Main, message, args) {
        try {
            let embed = new Discord.MessageEmbed()
            .setColor('RANDOM');
      if(!args[0])return  message.channel.send("level,money,rep,xp")
      if (['level', 'money', 'rep', 'xp'].includes(args[0].toLowerCase())){ 
      let text = " "
      let Values = `**${args[0].toLowerCase()}**`
          User.find({guildID:message.guild.id}).sort([[args[0],'descending','guildID']]).exec((err,res)=> {
              resL = 10
              if (res.length < 10){
                  resL = res.length
              }
          if(res.length === 0){embed.setDescription('К сожелению таблица данного сервера пуста.') }
          else {for(i = 0; i < resL; i++){
              switch (args[0].toLowerCase()) {
                  case "level":
                  text = `${abbreviateNumber(res[i][args[0].toLowerCase()])}:watermelon:`
                  break;
                  case "money":
                  text = `${abbreviateNumber(res[i][args[0].toLowerCase()])}💸`
                  break;
                  case "rep":
                  text = `${abbreviateNumber(res[i][args[0].toLowerCase()])}:thumbsup:`
                  break;
                  case "xp":
                  text = `${abbreviateNumber(res[i][args[0].toLowerCase()])}:fork_and_knife:`
                  break;
              }
                  embed.addField(`${i + 1}. ${Main.users.cache.get(res[i].userID).tag || "Неизвестно"}`,`${Values}: ${text}`)
          }
          }
          message.channel.send(embed)
      
        })
      }
        } catch (error) {
            
        }
    }
}
