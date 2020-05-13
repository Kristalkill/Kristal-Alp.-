const request = require('request-promise');
const superagent = require('superagent');
const fetch = require("node-fetch")
module.exports = {
  name: 'ss',
  description: 'Ссылка',
  aliases: ["ss"],
  public: true,
  async execute(Main, message, args) {
        if(!args[0]) return message.channel.send("А ссылку забув :?")
        fetch("https://chromechain.herokuapp.com/?url=" + args[0])
          .then(res => res.json())
          .then(body => {
            if(!body) return;
             console.log(body)
           let embed = new Discord.MessageEmbed()
           .setImage(body.content)
           message.channel.send(embed)

})
}
}
