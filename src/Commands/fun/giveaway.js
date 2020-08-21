const Command = require('../../Structures/Command');
const Discord = require('discord.js')
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['giveaway'],
			category: 'fun'
		});
	}
	run(message,args) {
try {
    switch(args[0]){
        case "add":
            try {
                let Duration = args[1];
                let Prize = args.slice(3).join(' ');
                let Winners = args[2];
                    if(ms(Duration)){
                        if(parseInt(Winners)){
                            if(Prize){
                                const embed  = new Discord.MessageEmbed()
                                .setTitle("🎉**Giveaway** 🎉")
                                .setDescription(`**${Prize}**\n\nВремя розыгрыша ${Duration}\nПобедителей:${Winners}`)
                                .setFooter(this.Main.user.tag)
                                message.channel.send(embed).then(message => {
                                message.react('🎉');
                                this.this.Main.db.Giveaway.create({guildID:message.guild.id,time:Date.now() + ms(Duration),prize:Prize,winners:Winners,messageID:message.id,channel:message.channel.id})
                             })
                            }else return message.channel.send("Укажите приз");
                        }else return message.channel.send("Укажите к-л победителей");
                    }else return message.channel.send("Укажите время розыгрыша");
                break;
            }catch (error) {
                console.log(error)  
            }
        case "end":
             try {
                let messageid = args[0];
                this.this.Main.db.Giveaway.findOne({messageID:messageid},async(err,res) => {
                    const GiveAway  = new Discord.MessageEmbed()
                    .setTitle(`**🎉Giveaway Endet🎉**`)
                    if(res){
                        let userees = await message.guild.channels.cache.get(res.channel).messages.fetch(res.messageID).then((v) => Array.from(v.reactions.cache.get("🎉").users.cache.filter(user => user.id != this.Main.user.id && !user.bot).keys()));
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
                else return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(`**Веддите коректное айди сообщения или данного Giveaway нету в БД**`));})
                break;       
        } catch (error) {
            console.log(error)
        }
        case "delete":
            try {
                let messageid2 = args[0];
                this.this.Main.db.Giveaway.findOne({messageID:messageid2},async(err,res) => {
                if(res){
                    await this.this.Main.db.Giveaway.deleteOne({guildID:res.guildID,time:res.time,prize:res.prize,winners:res.winners,messageID:res.messageID,channel:res.channel})
                    message.channel.send(this.Main.embeds.OKEmbed.setDescription(`**Giveaway под номером ${res.messageID} успешно удален**`));
                }else return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(`**Веддите коректное айди сообщения или данного Giveaway нету в БД**`)); })
                break;
            }catch (error) {
                console.log(error)   
            }
        }
} catch (error) {
    console.log(error)    
}}}
