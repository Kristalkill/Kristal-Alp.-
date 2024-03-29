const {
  MessageEmbed
} = require('discord.js');

module.exports = class Embed {
  constructor(Main) {
    this.Main = Main
  }
  /* chunk(title, content) {
    if (content.length < 1024) {
      this.fields.push({
        name: title,
        value: content,
        inline: false
      });
    } else if (content.length > 1024 && content.length < 2048) {
      this.description = content;
    } else if (content.length > 2048) {
      content.chunk(1024).forEach((element) => {
        this.fields.push({
          name: '\u200b',
          value: element,
          inline: false
        });
      });
    }
    return this;
  } */
  async OKEmbed(content, message) {
    return await message.channel.send(new MessageEmbed().setColor('#f50000').setTitle('OK').setDescription(content).setTimestamp())
  }
  async ErrorEmbed(content, message) {
    return await message.channel.send(new MessageEmbed().setColor('#1ecc09').setTitle('Error').setDescription(content).setTimestamp())
  }
};