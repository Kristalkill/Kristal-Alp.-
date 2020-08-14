module.exports = {
  name: 'add',
  description: 'Добавить монетки юзеру',
  Permission:["ADMINISTRATOR"],
  aliases: [],
  public: true,
  async execute(Main, message, args) {
    try {
      let member =  message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first() || message.guild.members.cache.get(args[3]) || message.author);
      let a = new Discord.MessageEmbed()
      .setDescription(`Вы успешно добавили **${member.user.username}** ${args[0]} в количестве \`${args[1]}\``)
      .setColor("RANDOM");
      User.findOne({guildID: message.guild.id, userID: member.user.id},(err,data) => {
      if (['level', 'money', 'rep', 'xp'].includes(args[0].toLowerCase())){ 
        message.channel.send(a)
        data[args[0].toLowerCase()] += Math.floor(parseInt(args[1]));
        data.save()
      
    }
    else if(isNaN(args[1])) {
       message.channel.send(`Укажите кол-во монет которое хотите передать`)
    }
    else {
       message.channel.send(embeds.ErrEmbed.setDescription('rep,money,level'))
    }
  
  })  
    } catch (error) {
      console.log(error)
    } 
}
}
