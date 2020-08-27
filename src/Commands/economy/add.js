const Command = require('../../Structures/Command');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['add'],
      category: 'economy',
      Permission:['ADMINISTRATOR']
		});
	}
	async run(message,language,args) {
    try {
      let member =  message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first() || message.guild.members.cache.get(args[0]));
      if(!member)return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.nomember))
      let data =  await this.Main.db.User.findOne({guildID: message.guild.id, userID: member.user.id})
      if (args[2] && args[1] && ['level', 'money', 'rep', 'xp'].includes(args[1].toLowerCase())){ 
        message.channel.send(this.Main.embeds.OKEmbed.setDescription(language.add.params.param1.translate({arg1:args[1],arg2:args[2],name:member.user.username})))
        data[args[1].toLowerCase()] += Math.floor(parseInt(args[2]));
        data.save()
      
    }else if(!args[1]){
      message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.add.params.param2))
    }else return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.add.params.param3.translate({arg0:args[2]})));
    } catch (error) {
      console.log(error)
    } 
}
}
