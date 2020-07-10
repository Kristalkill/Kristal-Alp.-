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
      if (err) {
        console.log(err)
      }
      if (Data) {
        if (!(args[0] = message.mentions.channels.first()||`undefined`)) return message.reply(ErrEmbed.setDescription('Укажы канал или чтоб офнуть напишы undefined'));
        else{
            Data.Lсhannel = args[0]
            Data.save()
            ChannelEmbed = new Discord.MessageEmbed()
            .setTitle(`${`Вы успешно изменили канал уходящих участников на`}\n${`<#${Data.Lchannel}>`}`)
            .setImage(message.guild.iconURL());
            message.channel.send(ChannelEmbed)
        }
          }

        })
      }
    }