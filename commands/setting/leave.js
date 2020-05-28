module.exports = {
  name: 'leave',
  description: 'Настройка лива.',
  aliases: ['leave'],
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
      .addField('**Изменение Статуса -**',`**${Data.Moderation.prefix}leave status (on или off)**`,true)
      .addField('**Изменение Заголовка -**',`**${Data.Moderation.prefix}leave Title текст**`,true)
      .addField('**Изменение Заголовка -**',`**${Data.Moderation.prefix}leave Description текст**`,true)
      .addField('**Изменение Заголовка -**',`**${Data.Moderation.prefix}leave Channel упоминание канала**`,true)
      .addField('**Информация о всем -**',`**${Data.Moderation.prefix}}leave**`,true)
      .addField("** **", '**Информация**')
      .addField('**🕥 Статус**', capitalize(Data.Lmessage.status),true)
      .addField('**📖 Заголовок**',Data.Lmessage.title || 'Нету',true)
      .addField('**📒 Описание**', Data.Lmessage.description || 'Нету',true)
      .addField('**📁 Канал**', Data.Lmessage.Channel ? `<#${Data.Lmessage.Channel}>` : 'Нету',true)
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
                if (Data.Lmessage.status == true) {
                  let ErrEmbedL1 = new Discord.MessageEmbed()
                  .setDescription(`Уже и так стоит On`)
                  .setImage(message.guild.iconURL());
                  message.channel.send(ErrEmbedL1)
                } else if (Data.Lmessage.status == false) {
                  Data.Lmessage.status = true
                  let LOnEmbed = new Discord.MessageEmbed()
                  .setDescription(`Уведомление о выходе из сервера включено на **${message.guild.name}**`)
                  .setImage(message.guild.iconURL());
                  message.channel.send(LOnEmbed)
                  Data.save()
                }
                break
              }
              case 'off': {
                if (Data.Lmessage.status == false) {
                  let ErrEmbedL2 = new Discord.MessageEmbed()
                  .setDescription(`Уже и так стоит Off`)
                  .setImage(message.guild.iconURL());
                  message.channel.send(ErrEmbedL2)
                } else if (Data.Lmessage.status == true) {
                  Data.Lmessage.status = false
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
            Data.Lmessage.title = args.slice(1).join(' ')
            Data.save()
            LTitleEmbed = new Discord.MessageEmbed()
            .setTitle('Вы успешно изменили Заголовок уходящих участников на')
            .setDescription(`${Data.Lmessage.title}`)
            .setImage(message.guild.iconURL());
            message.channel.send(LTitleEmbed)
            break
          }
          case 'description' || 'Description': {
            if (!args[1]) return message.reply('НАПИШИ ЧТО-ТО')
            Data.Lmessage.description = args.slice(1).join(' ')
            Data.save()
            DescriptionEmbed = new Discord.MessageEmbed()
            .setTitle(`Вы успешно изменили Описание уходящих участников на`)
            .setDescription(`${Data.Lmessage.description}`)
            .setImage(message.guild.iconURL());
            message.channel.send(DescriptionEmbed)
            break
          }
          case 'Channel' || 'Channel': {
            if (!message.mentions.channels.first()) return message.reply('Укажи канал дурачок')
            Data.Lmessage.Channel = message.mentions.channels.first().id
            Data.save()
            ChannelEmbed = new Discord.MessageEmbed()
            .setTitle(`${`Вы успешно изменили канал уходящих участников на`}\n${`<#${Data.Lmessage.Channel}>`}`)
            .setImage(message.guild.iconURL());
            message.channel.send(ChannelEmbed)
            break
          }
        }
      }
    })
  }
}
