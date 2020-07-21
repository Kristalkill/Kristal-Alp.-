const ms = require('ms');
const message = require('../../events/message');

let Duration = args[1];
let Prize = args.slice(3).join(' ');
let Winners = args[2];
let Channel = message.mentions.channels.first();
if(Channel){
    if(parseInt(ms(Duration))){
        if(parseInt(Winners)){
            if(Prize){
                Giveaway.create({guildID:message.guild.id,time:Date.now() + duration,prize:Prize,winners:Winners})
            }else return message.channel.send("Укажите приз");
        }else return message.channel.send("Укажите к-л победителей");
    }else return message.channel.send("Укажите время розыгрыша");
}else return essage.channel.send("Укажите канал");