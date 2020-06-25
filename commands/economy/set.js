ErrEmbed = require('../../embeds/ErrEmbed.js')
module.exports = {
  name: 'set',
  description: 'Поставить уровень',
  aliases: [],
  public: true,
  async execute(Main, message, args) {
    let member =  message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[3]) || message.author);
    let a = new Discord.MessageEmbed()
    .setDescription(`Вы успешно поставили **${member.user.username}** ${args[0]} в количестве \`${args[1]}\``)
    .setColor("RANDOM");
    User.findOne({guildID: message.guild.id, userID: member.user.id},(err,data) => {
    if (['level', 'money', 'rep', 'xp'].includes(args[0].toLowerCase())){ 
      message.channel.send(a)
      data[args[0].toLowerCase()] = parseInt(args[1]);
      data.save()
    
  }
  else if(isNaN(args[1])) {
    message.reply(`Укажите кол-во монет которое хотите поставить`)
  }
  else {
    message.reply(ErrEmbed.setDescription('rep,money,level'))
  }

})   
}
}