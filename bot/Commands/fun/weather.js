const {
  MessageEmbed
} = require('discord.js');
const Command = require('../../Structures/Construction/Command');
const weather = require('weather-js');
module.exports = class extends Command {
  constructor(...args) {
    super(...args, {
      aliases: [],
      category: 'fun',
    });
  }

  async run(message, city) {
    if (!city) return message.channel.send('Укажите местоположение.');
    weather.find({
        search: city.join(''),
        degreeType: 'C',
        lang: 'ru'
      },
      function(error, result) {
        if (error || result === undefined || result.length === 0) return message.channel.send('Местоположение не найдено.');
        const {
          current,
          location
        } = result[0];
        message.channel.send(new MessageEmbed()
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
          .setTimestamp());
      }
    );
  }
};