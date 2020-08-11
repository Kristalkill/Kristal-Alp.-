const ms = require('ms');
module.exports = {
    name: 'giveaway',
    description: 'giveaway',
    aliases: ["giveaway"],
    public: true,
    async execute(Main, message, args) {
try {
    switch(args[0]){
        case "add":
            try {
                let Duration = args[2];
                let Prize = args.slice(4).join(' ');
                let Winners = args[3];
                let Channel = message.mentions.channels.first();
                if(Channel){
                    if(ms(Duration)){
                        if(parseInt(Winners)){
                            if(Prize){
                                const embed  = new Discord.MessageEmbed()
                                .setTitle("🎉**Giveaway** 🎉")
                                .setDescription(`**${Prize}**\n\nВремя розыгрыша ${Duration}\nПобедителей:${Winners}`)
                                .setFooter(Main.user.tag)
                                message.channel.send(embed).then(message => {
                                message.react('🎉');
                                Giveaway.create({guildID:message.guild.id,time:Date.now() + ms(Duration),prize:Prize,winners:Winners,messageID:message.id,channel:message.channel.id})
                             })
                            }else return message.channel.send("Укажите приз");
                        }else return message.channel.send("Укажите к-л победителей");
                    }else return message.channel.send("Укажите время розыгрыша");
                }else return message.channel.send("Укажите канал");
                break;
            }catch (error) {
                console.log(error)  
            }
        case "end":
             try {
                let messageid = args[1];
                Giveaway.findOne({messageID:messageid},async(err,res) => {
                    const GiveAway  = new Discord.MessageEmbed()
                    .setTitle(`**🎉Giveaway Endet🎉**`)
                    if(res){
                        let userees = await message.guild.channels.cache.get(res.channel).messages.fetch(res.messageID).then((v) => Array.from(v.reactions.cache.get("🎉").users.cache.filter(user => user.id != Main.user.id && !user.bot).keys()));
                        if(userees.length){
                        let random = [];
                        function shuffle(array) {
                        array.sort(() => Math.random() - 0.5);}
                        shuffle(userees)
                        random = userees.slice(0, res.winners);
                        message.guild.channels.cache.get(res.channel).send(GiveAway.setDescription(`Победители ${random.map(a => message.guild.members.cache.get(a)).join(', ')}`));
                    }else{
                    message.guild.channels.cache.get(res.channel).send(GiveAway.setDescription(`Нету победителей`))}
                    await Giveaway.deleteOne({guildID:res.guildID,time:res.time,prize:res.prize,winners:res.winners,messageID:res.messageID,channel:res.channel});}
                else return message.channel.send(ErrEmbed.setDescription(`**Веддите коректное айди сообщения или данного Giveaway нету в БД**`));})
                break;       
        } catch (error) {
            console.log(error)
        }
        case "delete":
            try {
                let messageid2 = args[1];
                Giveaway.findOne({messageID:messageid2},async(err,res) => {
                if(res){
                    await Giveaway.deleteOne({guildID:res.guildID,time:res.time,prize:res.prize,winners:res.winners,messageID:res.messageID,channel:res.channel})
                    message.channel.send(OKEmbed.setDescription(`**Giveaway под номером ${res.messageID} успешно удален**`));
                }else return message.channel.send(ErrEmbed.setDescription(`**Веддите коректное айди сообщения или данного Giveaway нету в БД**`)); })
                break;
            }catch (error) {
                console.log(error)   
            }
        }
} catch (error) {
    console.log(error)    
}}}
