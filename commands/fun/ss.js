const fetch = require("node-fetch")
ErrEmbed = require('../../embeds/ErrEmbed.js')
module.exports = {
  name: 'ss',
  description: 'Ссылка',
  aliases: ["ss"],
  public: true,
  async execute(Main, message, args) {
  try{
          Guild.findOne({guildID: message.guild.id} , (err,res) => {
        if(!args[0]) return message.channel.send(ErrEmbed.setDescription(`А ссылку забув :?\nПример использования **${res.Moderation.prefix}ss google.com**`))
        fetch(`https://chromechain.herokuapp.com/?url=${args[0]}`)
          .then(res => res.json())
          .then(body => {
            if(!body) return;
           let embed = new Discord.MessageEmbed()
           .setTitle('Скриншот')
           .setDescription(args[0])
           .setImage(body.content)
           message.channel.send(embed)
})
})
}catch(error){
  console.log(error)
}
}
}
