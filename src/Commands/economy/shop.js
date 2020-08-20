const Command = require('../../Structures/Command');
const Discord = require('discord.js')
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['shop'],
			description: 'shop',
            category: 'economy',
            PermissionBOT:["MANAGE_ROLES"]
		});
	}
	run(message,args) {
try {
    this.Main.db.Guild.findOne({guildID: message.guild.id},async(err,res) => {
        if(err)return console.log(err);
        this.Main.db.User.findOne({guildID: message.guild.id, userID: message.author.id},async(err,Data)=> {
            if(err)return console.log(err);
        let role = (message.mentions.roles.first() || message.guild.roles.cache.get(args[1]));
        if(role){
            if(args[0] == 'add'){
                if(message.member.hasPermission("ADMINISTRATOR")){
                    if(parseInt(args[2]) > 0){
                        if(res.Economy.shop.get(role.id)){
                        message.channel.send(this.Main.embeds.ErrEmbed.setDescription(`Роль уже есть в магазине`));
                    }else{
                       res.Economy.shop.set(role.id,parseInt(args[2]));
                       message.channel.send(this.Main.embeds.OKEmbed.setDescription('Роль успешно добавлена в магазин'));
                    res.save();
                    }
                    }else{
                    message.channel.send(this.Main.embeds.ErrEmbed.setDescription(`Минимальная цена 1$`));
                    }}else{
                        message.channel.send(this.Main.embeds.ErrEmbed.setDescription(`У вас нету права ADMINISTRATOR`))
                    }
        }else if(args[0] == 'delete'){
            if(message.member.hasPermission("ADMINISTRATOR")){
            if(res.Economy.shop.get(role.id)){
                res.Economy.shop.delete(role.id)
                message.channel.send(this.Main.embeds.OKEmbed.setDescription('Роль успешно удалена из магазина'));
                res.save();
            }else{
                message.channel.send(this.Main.embeds.ErrEmbed.setDescription(`Роли нету в магазине`));
            }
            }else{
                message.channel.send(this.Main.embeds.ErrEmbed.setDescription(`У вас нету права ADMINISTRATOR`))
            }
        }else{
            if(message.member.roles.cache.has(role.id)){
                message.channel.send(this.Main.embeds.ErrEmbed.setDescription(`У вас уже есть данная роль`))
            }else if(res.Economy.shop.get(role.id)){
                message.author.roles.add(role.id)
                Data.money += res.Economy.shop.get(role.id).values();
                message.channel.send(this.Main.embeds.OKEmbed.setDescription('Роль успешно добавлена вам!'));
            }else return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(`Данной роли нету в магазине`));
        }
        }else if(args[0] == 'list' || !args[0]){
        let embed = new Discord.MessageEmbed()
        .setTitle(`Магазин`)
        if(res.Economy.shop.size > 0){
        var text = " "
        var i = 1
        res.Economy.shop.forEach((value, key) => {text += `**${i++}**.${message.guild.roles.cache.get(key)} - ${value}$\n`})
        }else{
        var text = "Пусто"
        }
        await message.channel.send(embed.setDescription(text))
        }else return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(`Укажите роль`))  
})
})
}catch (error) {
    console.log(error.stack)
}
}
}