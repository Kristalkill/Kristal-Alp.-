ErrEmbed = require('../../embeds/ErrEmbed.js')
module.exports = {
  name: 'reverse',
  description: 'reverse',
  aliases: ["reverse"],
  public: true,
  async execute(Main, message, args) {
  try{
      if(!args)return  message.channel.send(ErrEmbed.setDescription('Введите что-то'));
      let aembed = new Discord.MessageEmbed()
      .setTitle("Перевёрнуто успешно")
      .setDescription(args.join(' ').split('').reverse().join(''));
      message.channel.send(aembed);
}catch(error){
  console.log(error)
}
}
}