const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const weather = require('weather-js');
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: [],
      category: 'fun',
    });
  }

  async run(message, args) {
    try {
      weather.find(
        { search: args.join(''), degreeType: 'C', lang: 'ru-RU' },
        function (error, result) {
          if (!args[0]) return message.channel.send('Укажите местоположение.');
          if (result === undefined || result.length === 0) {
            return message.channel.send('Местоположение не найдено.');
          }
          var current = result[0].current;
          var location = result[0].location;

          const embed = new MessageEmbed()
            .setTitle(`Погода в ${current.observationpoint}`)
            .setColor('#da7bd4')
            .setDescription(`**${current.skytext}**`)
            .setThumbnail(current.imageUrl)
            .addField('Временная зона:', `UTC${location.timezone}`, true)
            .addField('Тип температуры:', `C`, true)
            .addField(
              'Температура:',
              `${current.temperature} градус(а, ов)`,
              true
            )
            .addField(
              'Ощущается как:',
              `${current.feelslike} градус(а, ов)`,
              true
            )
            .addField('Ветер:', current.winddisplay, true)
            .addField('Влажность:', `${current.humidity}%`, true)
            .addField(`День:`, `${current.day}`, true)
            .addField(`Дата:`, `${current.date}`, true)
            .setFooter('Baxter, 2019.', client.user.avatarURL)
            .setTimestamp();
          message.channel.send(embed);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
};
