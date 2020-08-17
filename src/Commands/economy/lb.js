const Command = require('../../Structures/Command');
const Discord = require('discord.js')
module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['leaders'],
			description: 'leaders',
			category: 'economy'
		});
	}
	run(message,args) {
        try {
            let embed = new Discord.MessageEmbed()
            .setColor('RANDOM');
      if(!args[0])return  message.channel.send("level,money,rep,xp")
      if (['level', 'money', 'rep', 'xp'].includes(args[0].toLowerCase())){ 
      let text = " "
      let Values = `**${args[0].toLowerCase()}**`
      this.Main.db.User.find({guildID:message.guild.id}).sort([[args[0],'descending','guildID']]).exec((err,res)=> {
              resL = 10
              if (res.length < 10){
                  resL = res.length
              }
          if(res.length === 0){embed.setDescription('К сожелению таблица данного сервера пуста.') }
          else {for(i = 0; i < resL; i++){
              let text1 = this.Main.utils.abbreviateNumber(res[i][args[0].toLowerCase()]);
              switch (args[0].toLowerCase()) {
                  case "level":
                  text = `${text1}:watermelon:`
                  break;
                  case "money":
                  text = `${text1}💸`
                  break;
                  case "rep":
                  text = `${text1}:thumbsup:`
                  break;
                  case "xp":
                  text = `${text1}:fork_and_knife:`
                  break;
              }
                  embed.addField(`${i + 1}. ${this.Main.users.cache.get(res[i].userID).tag || "Неизвестно"}`,`${Values}: ${text}`)
          }
          }
          message.channel.send(embed)
      
        })
      }
        } catch (error) {
            console.log(error)
        }
    }
}
