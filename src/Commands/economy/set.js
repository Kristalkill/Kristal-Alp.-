const Command = require('../../Structures/Command');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['set'],
			description: 'set',
			category: 'economy'
		});
	}
	run(message,args) {
    try {
      if(isNaN(args[1]) || parseInt(args[1])> 10000000 || parseInt(args[1])<1)return  message.channel.send(this.embeds.ErrEmbed.setDescription(`Укажите кол-во монет которое хотите поставить не меньше 1 и не больше 10М`))
      if(!args[0])return  message.channel.send(this.embeds.ErrEmbed.setDescription("rep,money"))
      let member =  message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first()  || message.guild.members.cache.get(args[3]) || message.author);
      this.Main.db.User.findOne({guildID: message.guild.id, userID: member.user.id},(err,data) => {
      if (['level', 'money', 'rep', 'xp'].includes(args[0].toLowerCase())){ 
        message.channel.send(this.embeds.OKEmbed.setDescription(`Вы успешно поставили **${member.user.username}** ${args[0]} в количестве \`${args[1]}\``))
        data[args[0].toLowerCase()] = parseInt(args[1]);
        data.save()
     }
    }) 
    } catch (error) {
      console.log(error.stack)
    }  
}
}