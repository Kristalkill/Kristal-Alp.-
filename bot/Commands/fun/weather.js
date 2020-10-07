const { MessageEmbed } = require('discord.js');
const Command = require('../../Structures/Command');
const weather = require('weather-js');
module.exports1 = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: [],
      category: 'fun',
    });
  }

  async run(message, args) {
    try {
      if (!args[0]) return message.channel.send('Укажите местоположение.');
      weather.find(
        { search: args.join(''), degreeType: 'C', lang: 'ru-RU' },
        function (error, result) {
          if (result === undefined || result.length === 0) {
            return message.channel.send('Местоположение не найдено.');
          }
          const { current, location } = result[0];

          const embed = new MessageEmbed()
            .setTitle(`Погода в ${current.observationpoint}`)
            .setColor('#da7bd4')
            .setDescription(`**${current.skytext}**`)
            .setThumbnail(current.imageUrl)
            .addField(
              `Температура`,
              `Температура:  \`${current.temperature}\`°C\nОщущается как:  \`${current.feelslike}\`°C`
            )
            .addField(
              `Дата`,
              `Дата:  \`${current.date}\`\nДень:  \`${current.day}\`\nUTC: \`${location.timezone}:00\``
            )
            .addField(
              `Другое`,
              `Ветер: \`${current.winddisplay}\`\nВлажность: \`${current.humidity}%\``
            )
            .setFooter(`Спиженно у @MrVaDiM4iK#0232`)
            .setTimestamp();
          message.channel.send(embed);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
};
