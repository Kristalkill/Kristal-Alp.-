ErrEmbed = require('../../embeds/ErrEmbed.js')
OKEmbed = require('../../embeds/OKEmbed.js')
module.exports = {
  name: 'npfr',
  description: 'Настройка ролей в профиле.',
  aliases: ['npfr'],
  public: true,
  async execute(Main, message, args) {
      let member =  message.guild.member(message.author).hasPermission("ADMINISTRATOR");
      if(!config.owner.includes(message.author.id)){
      if(!member.hasPermission("ADMINISTRATOR")){
         message.reply(ErrEmbed.setDescription(`**У вас нету прав** ${`\`ADMINISTRATOR\``}`
         ))
       }
    }
      Guild.findOne({guildID: message.guild.id}, (err, Data) => {
      if(!args[0])return message.reply(ErrEmbed.setDescription(`**Команды**\n${Data.Moderation.prefix}list - показать список команд\n${Data.Moderation.prefix}delete - удалить из чорного списка\n${Data.Moderation.prefix}clear - очистить список\n${Data.Moderation.prefix}add - добавить`))
      let role = message.mentions.roles.first()|| message.guild.roles.cache.get(args[1])
      switch (args[0]) {
case 'list':
        if(Data.Moderation.nonpfroles.includes == undefined)return message.reply(ErrEmbed.setDescription('У вас на сервере нету ролей которые находяться в чорном списке'));
        let Listembed = new Discord.MessageEmbed()
        .setTitle('**Лист не отображающихся ролей**')
        .setDescription(`**Роли**\n\n${Data.Moderation.nonpfroles.map(m => `<@&${m}>`).join("\n")||"Нету"}`)
        message.channel.send(Listembed)
        break;
case 'delete':
        if(!role)return message.reply(ErrEmbed.setDescription('Упомените роль,пример @Роль'));
        if(Data.Moderation.nonpfroles.includes == undefined)return message.reply(ErrEmbed.setDescription('Там и так нету ролей'));
        if(Data.Moderation.nonpfroles.includes(role.id||role) == false)return message.reply(ErrEmbed.setDescription('Этой роли в чорном списке нету'));
        let deleteRole = Data.Moderation.nonpfroles.indexOf(role.id||role);
        Data.Moderation.nonpfroles.splice(deleteRole)
        Data.save()
        OKEmbed.setDescription(`Успешно удалена  ${role.name} из чорного списка профиля`);
        message.channel.send(OKEmbed)
        break;
case 'clear':
       if(Data.Moderation.nonpfroles.includes == undefined)return message.reply(ErrEmbed.setDescription('Там и так нету ролей'));
       Data.Moderation.nonpfroles = undefined
       Data.save()
       OKEmbed.setDescription(`Все роли удалены из чорного списка`);
       message.channel.send(OKEmbed)
       break;
case 'add':
       if(!role)return message.reply(ErrEmbed.setDescription('Упомените роль,пример @Роль'));
       if(Data.Moderation.nonpfroles.includes(role.id||role))return message.reply(ErrEmbed.setDescription('Эта роль и так в чорном списке'));
       Data.Moderation.nonpfroles.push(role.id||role);
       Data.save()
       OKEmbed.setDescription(`Успешно добавлена  ${role.name} в черный список профиля`);
       message.channel.send(OKEmbed)
       break;
}})}}
