const ms = require('ms');
module.exports = {
    name: 'giveaway',
    description: 'giveaway',
    aliases: ["giveaway"],
    public: true,
    async execute(Main, message, args) {
let Duration = args[1];
let Prize = args.slice(3).join(' ');
let Winners = args[2];
let Channel = message.mentions.channels.first();
if(Channel){
    if(parseInt(ms(Duration))){
        if(parseInt(Winners)){
            if(Prize){
                const embed  = new Discord.MessageEmbed()
                .setTitle("🎉**Giveaway** 🎉")
                .setDescription(`**${Prize}**\n\nВремя розыгрыша ${Duration}\nПобедителей:${Winners}`)
                .setFooter(Main.user.tag)
                message.channel.send(embed).then(message => {
                Giveaway.create({guildID:message.guild.id,time:Date.now() + ms(Duration),prize:Prize,winners:Winners,messageID:message.id})
                })
            }else return message.channel.send("Укажите приз");
        }else return message.channel.send("Укажите к-л победителей");
    }else return message.channel.send("Укажите время розыгрыша");
}else return message.channel.send("Укажите канал");
    }
}