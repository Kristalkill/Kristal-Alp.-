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
      let member =  message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first() || message.author);
      this.Main.db.User.findOne({guildID: message.guild.id, userID: member.user.id},(err,data) => {
      if(err)return console.log(err);
      if(!args[0])return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription(`Укажите что вы хотите добавить!`))
      if(isNaN(args[1]))return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(`Укажите кол-во ${args[0]} которое хотите добавить`));
      if (['level', 'money', 'rep', 'xp'].includes(args[0].toLowerCase())){ 
        message.channel.send(this.Main.embeds.OKEmbed.setDescription(`Вы успешно добавили ${args[0]} пользывателю:**${member.user.username}**  в количестве \`${args[1]}\``))
        data[args[0].toLowerCase()] += Math.floor(parseInt(args[1]));
        data.save()
      
    }
    else return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(`Укажите что вы хотите добавить: Money,xp,level,rep)!`))
  
  })  
    } catch (error) {
      console.log(error)
    } 
}
}
