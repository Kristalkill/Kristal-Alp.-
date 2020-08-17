const Command = require('../../Structures/Command');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['add'],
			description: 'add',
      category: 'economy',
      Permission:['ADMINISTRATOR']
		});
	}
	run(message,args) {
    try {
      let member =  message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first() || message.guild.members.cache.get(args[3]) || message.author);
      this.Main.db.User.findOne({guildID: message.guild.id, userID: member.user.id},(err,data) => {
      if(err)return console.log(err);
      if (['level', 'money', 'rep', 'xp'].includes(args[0].toLowerCase())){ 
        message.channel.send(this.Main.embeds.OKEmbed.setDescription(`Вы успешно добавили ${args[0]} пользывателю:**${member.user.username}**  в количестве \`${args[1]}\``))
        data[args[0].toLowerCase()] += Math.floor(parseInt(args[1]));
        data.save()
      
    }
    else if(isNaN(args[1])) {
       message.channel.send(this.Main.embeds.ErrEmbed.setDescription(`Укажите кол-во ${args[0]} которое хотите добавить`))
    }
    else {
       message.channel.send(this.Main.embeds.ErrEmbed.setDescription('rep,money,level,xp'))
    }
  
  })  
    } catch (error) {
      console.log(error)
    } 
}
}
