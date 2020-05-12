module.exports = {
  name: 'welcome',
  description: 'Настройка приветсвий.',
  aliases: ['welcome'],
  public: false,
  async execute(Main, message, args) {
    Guild.findOne({guildID: message.guild.id}, (err, Data) => {
      const capitalize = i => {
        i = i.toString();
        return i[0].toUpperCase() + i.slice(1)
      }
      let LeaveHelpEmbed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle("**Использивание и Информация**")
      .addField("** **", '**Использивание**')
      .addField('**Изменение Статуса -**',`**${Data.prefix}welcome status (on или off)**`,true)
      .addField('**Изменение Заголовка -**',`**${Data.prefix}welcome Title текст**`,true)
      .addField('**Изменение Заголовка -**',`**${Data.prefix}welcome Description текст**`,true)
      .addField('**Изменение Заголовка -**',`**${Data.prefix}welcome Channel упоминание канала**`,true)
      .addField('**Информация о всем -**',`**${Data.prefix}welcome**`,true)
      .addField("** **", '**Информация**')
      .addField('**🕥 Статус**', capitalize(Data.Wmessage.status),true)
      .addField('**📖 Заголовок**',Data.Wmessage.title || 'Нету',true)
      .addField('**📒 Описание**', Data.Wmessage.description || 'Нету',true)
      .addField('**📁 Канал**', Data.Wmessage.Channel ? `<#${Data.Wmessage.Channel}>` : 'Нету',true)
      .setThumbnail(message.guild.iconURL(({dynamic: true, size: 2048})))
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}));
      if (err) {
        console.log(err)
      }
      if (Data) {
        if (!args[0]) return message.reply(LeaveHelpEmbed)
        switch (args[0].toLowerCase()) {
          case 'status' || 'Status': {
            if (!args[1]) return message.reply('ON ИЛИ FAlSE')
            switch (args[1].toLowerCase()) {
              case 'on': {
                if (Data.Wmessage.status == true) {
                  let ErrEmbedL1 = new Discord.MessageEmbed()
                  .setDescription(`Уже и так стоит On`)
                  .setImage(message.guild.iconURL());
                  message.channel.send(ErrEmbedL1)
                } else if (Data.Wmessage.status == false) {
                  Data.Wmessage.status = true
                  let LOnEmbed = new Discord.MessageEmbed()
                  .setDescription(`Уведомление о выходе из сервера включено на **${message.guild.name}**`)
                  .setImage(message.guild.iconURL());
                  message.channel.send(LOnEmbed)
                  Data.save()
                }
                break
              }
              case 'off': {
                if (Data.Wmessage.status == false) {
                  let ErrEmbedL2 = new Discord.MessageEmbed()
                  .setDescription(`Уже и так стоит Off`)
                  .setImage(message.guild.iconURL());
                  message.channel.send(ErrEmbedL2)
                } else if (Data.Wmessage.status == true) {
                  Data.Wmessage.status = false
                  let LOffEmbed = new Discord.MessageEmbed()
                  .setDescription(`Уведомление о выходе из сервера выключено на **${message.guild.name}**`)
                  .setImage(message.guild.iconURL());
                  message.channel.send(LOffEmbed)
                  Data.save()
                }
              }
            };
            break
          }
          case 'title' || 'Title': {
            if (!args[1]) return message.reply('НАПИШИ ЧТО-ТО')
            Data.Wmessage.title = args.slice(1).join(' ')
            Data.save()
            LTitleEmbed = new Discord.MessageEmbed()
            .setTitle('Вы успешно изменили Заголовок уходящих участников на')
            .setDescription(`${Data.Wmessage.title}`)
            .setImage(message.guild.iconURL());
            message.channel.send(LTitleEmbed)
            break
          }
          case 'description' || 'Description': {
            if (!args[1]) return message.reply('НАПИШИ ЧТО-ТО')
            Data.Wmessage.description = args.slice(1).join(' ')
            Data.save()
            DescriptionEmbed = new Discord.MessageEmbed()
            .setTitle(`Вы успешно изменили Описание уходящих участников на`)
            .setDescription(`${Data.Wmessage.description}`)
            .setImage(message.guild.iconURL());
            message.channel.send(DescriptionEmbed)
            break
          }
          case 'Channel' || 'Channel': {
            if (!message.mentions.channels.first()) return message.reply('Укажи канал дурачок')
            Data.Wmessage.Channel = message.mentions.channels.first().id
            Data.save()
            ChannelEmbed = new Discord.MessageEmbed()
            .setTitle(`${`Вы успешно изменили канал уходящих участников на`}\n${`<#${Data.Wmessage.Channel}>`}`)
            .setImage(message.guild.iconURL());
            message.channel.send(ChannelEmbed)
            break
          }
        }
      }
    })
  }
}
