module.exports = {
  name: 'roll',
  description: 'рандомное число',
  aliases: ["r"],
  public: true,
  async execute(Main, message, args) {
        let num1 = 1, num2 = 100;
        if (args[0]) {
            let editNum = bot.toNum(args[0])
            if (editNum)
                num2 = editNum
        }
        if (args[1]) {
            let editNum1 = bot.toNum(args[0])
            let editNum2 = bot.toNum(args[1])
            if (editNum1)
                num1 = editNum1
            if (editNum2)
                num2 = editNum2
        }
        const embed = new Discord.MessageEmbed()
            .setColor("#70FF0D")
            .setTitle(`Рандомное число: ${Math.floor(Math.random() * (num2 - num1)) + num1}`)
        message.channel.send(embed)
}
}
