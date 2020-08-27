const Command = require('../../Structures/Command');
const Discord = require('discord.js')
module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			aliases: ['leaders'],
			category: 'economy'
		});
	}
	async run(message,language,args) {
        try {
            let embed = new Discord.MessageEmbed()
            .setColor('RANDOM');
      if(!args[0])return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.lb.params.param1))
      if (['level', 'money', 'rep', 'xp'].includes(args[0].toLowerCase())){ 
      let text = " "
      switch (args[0].toLowerCase()) {
          case "level":
          text = `:watermelon:`
          break;
          case "money":
          text = `💸`
          break;
          case "rep":
          text = `:thumbsup:`
          break;
          case "xp":
          text = `:fork_and_knife:`
          break;
      }
      let Values = `**${args[0].toLowerCase()}**`
      let res = await this.Main.db.User.find({guildID:message.guild.id}).sort([[args[0],'descending','guildID']])
      let resL = 10
      if (res.length < 10)return resL = res.length
      if(res.length === 0){embed.setDescription(language.lb.params.param2)
      }else{
        let i = 0;
        res.slice(0,resL).forEach(res => {
          embed.addField(`${i + 1}. ${message.guild.members.cache.has(res.userID) ? this.Main.users.cache.get(res.userID).tag : language.lb.params.param3}`,`${Values}: ${this.Main.utils.abbreviateNumber(res[args[0].toLowerCase()])}:${text}`)
        });
        message.channel.send(embed)
      }
      }
        } catch (error) {
            console.log(error)
        }
    }
}
