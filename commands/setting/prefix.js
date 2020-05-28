ErrEmbed = require('../../embeds/ErrEmbed.js')
OKEmbed = require('../../embeds/OKEmbed.js')
module.exports = {
  name: 'prefix',
  description: 'Настройка ролей в профиле.',
  aliases: ['prefix'],
  public: true,
  async execute(Main, message, args) {
    Guild.findOne({guildID: message.guild.id},(err,res) => {
  let member =  message.guild.member(message.author);
  if(!config.owner.includes(message.author.id)){
  if(!member.hasPermission("ADMINISTRATOR")){
     message.reply(ErrEmbed.setDescription(`**У вас нету прав** ${`\`ADMINISTRATOR\``}`
     ))
   }
}
  else if(args[0]){
    res.Moderation.prefix = args[0]
    res.save()
    let embed = new Discord.MessageEmbed()
    .setTitle('Префикс успешно изменен')
    .setDescription(`Префикс успешно был изменен на \`${args[0]}\`,его изменил ${member.user.username}`)
    message.channel.send(embed)
  }
  else{
    let embed = new Discord.MessageEmbed()
    .setTitle(`Ваш префикс ${res.Moderation.prefix}`)
    .setDescription(`Ваш префикс ${res.Moderation.prefix}\nЧтобы установить префикс вводите \`${res.Moderation.prefix}prefix знак\` `)
    message.channel.send(embed)
  }
})
  }}
