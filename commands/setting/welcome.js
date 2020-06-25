const ErrEmbed = require("../../embeds/ErrEmbed");

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
      if (err) {
        console.log(err)
      }
      if (Data) {
        if (!(args[0] = message.mentions.channels.first()||`undefined`)) return message.reply(ErrEmbed.setDescription('Укажы канал или чтоб офнуть напишы undefined'));
        else{
            Data.Wсhannel = args[0]||undefined
            Data.save()
            ChannelEmbed = new Discord.MessageEmbed()
            .setTitle(`${`Вы успешно изменили канал уходящих участников на`}\n${`<#${Data.Wchannel}>`}`)
            .setImage(message.guild.iconURL());
            message.channel.send(ChannelEmbed)
        }
          }

        })
      }
    }
