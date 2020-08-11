toNum = require('../../functions/toNum.js')
ErrEmbed = require('../../embeds/ErrEmbed.js')
module.exports = {
  name: 'roll',
  description: 'рандомное число',
  aliases: ["r"],
  public: true,
  async execute(Main, message, args) {
try{
        if (!args[1])return num1 = 0,num2 = 100;
        let num1 = toNum(args[0])
        let num2 = toNum(args[1])
        let random = Math.floor(Math.random() * (num2 - num1)) + num1
        if(random > 9999999)return message.channel.send(ErrEmbed.setDescription("Введите числа поменьше"))
        const embed = new Discord.MessageEmbed()
            .setColor("#70FF0D")
            .setTitle(`Вам выпало число: ${random} от ${num1} до ${num2}`)
        message.channel.send(embed)
}catch(error){
console.log(error)
}
}
}
