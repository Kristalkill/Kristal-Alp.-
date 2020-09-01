const Command = require('../../Structures/Command');
const Discord = require("discord.js-light");
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['shop'],
            category: 'economy',
            PermissionBOT:["MANAGE_ROLES"]
		});
	}
	async run(message,language,args) {
try {
        let res  =  await this.Main.db.Guild.findOne({guildID: message.guild.id})
        let Data = await this.Main.db.User.findOne({guildID: message.guild.id, userID: message.author.id})
        let role = (message.mentions.roles.first() || message.guild.roles.cache.get(args[1]));
        if(role){
            if(args[0].toLowerCase() == 'add'){
                if(message.member.hasPermission("ADMINISTRATOR")){
                    if(parseInt(args[2]) > 0){
                        if(res.Economy.shop.get(role.id)){
                        message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.shop.params.param1));
                    }else{
                       res.Economy.shop.set(role.id,parseInt(args[2]));
                       message.channel.send(this.Main.embeds.OKEmbed.setDescription(language.shop.params.param2));
                    res.save();
                    }
                    }else{
                    message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.shop.params.param3));
                    }}else{
                        message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.noperms.translate({perms:"ADMINISTRATOR"})))
                    }
            }else if(args[0].toLowerCase() == 'delete'){
                if(message.member.hasPermission("ADMINISTRATOR")){
                    if(res.Economy.shop.get(role.id)){
                        res.Economy.shop.delete(role.id)
                        message.channel.send(this.Main.embeds.OKEmbed.setDescription(language.shop.params.param4));
                        res.save();
                    }else{
                        message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.shop.params.param5));
                    }
                }else{
                    message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.noperms.translate({perms:"ADMINISTRATOR"})))
                }
            }else if(args[0].toLowerCase() == 'buy'){
                if(message.member.roles.cache.has(role.id)){
                    message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.shop.params.param6))
                }else if(res.Economy.shop.has(role.id)){
                    if(res.Economy.shop.get(role.id) > Data.money)return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.nomoney));
                    message.guild.member(message.author).roles.add(role.id)
                    Data.money -= res.Economy.shop.get(role.id);
                    Data.save()
                    message.channel.send(this.Main.embeds.OKEmbed.setDescription(language.shop.params.param7));
                }else return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.shop.params.param8));
        }

    }else if(!args[0] || !["add","delete","buy"].includes(args[0].toLowerCase())){
        let embed = new Discord.MessageEmbed()
        .setTitle(language.shop.params.param9)
        if(res.Economy.shop.size > 0){
        var text = " "
        var i = 1
        res.Economy.shop.forEach((value, key) => {text += `**${i++}**.${message.guild.roles.cache.get(key)} - ${value}$\n`})
        }else {var text = language.shop.params.param10}
        return message.channel.send(embed.setDescription(text))
        }else return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.shop.params.param11))
    }catch (error) {
    console.log(error.stack)
}
}
}