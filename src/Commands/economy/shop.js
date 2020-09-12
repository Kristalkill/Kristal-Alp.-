const Command = require('../../Structures/Command');
const Discord = require('discord.js');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['shop'],
            category: 'economy',
            PermissionBOT:["MANAGE_ROLES"]
		});
	}
	async run(message,args) {
try {   
        const language = require(`../../languages/${message.guild.settings.Moderation.language ||"en"}.json`);
        let role = (message.mentions.roles.first() || message.guild.roles.cache.get(args[1]));
        if(role){
            if(args[0].toLowerCase() == 'add'){
                if(message.member.hasPermission("ADMINISTRATOR")){
                    if(parseInt(args[2]) > 0){
                        if(message.guild.settings.Economy.shop.get(role.id)){
                        message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.shop.params.param1));
                    }else{
                       message.guild.settings.Economy.shop.set(role.id,parseInt(args[2]));
                       message.channel.send(this.Main.embeds.OKEmbed.setDescription(language.shop.params.param2));
                    ;
                    }
                    }else{
                    message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.shop.params.param3));
                    }}else{
                        message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.noperms.translate({perms:"ADMINISTRATOR"})))
                    }
            }else if(args[0].toLowerCase() == 'delete'){
                if(message.member.hasPermission("ADMINISTRATOR")){
                    if(message.guild.settings.Economy.shop.get(role.id)){
                        message.guild.settings.Economy.shop.delete(role.id)
                        message.channel.send(this.Main.embeds.OKEmbed.setDescription(language.shop.params.param4));
                        ;
                    }else{
                        message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.shop.params.param5));
                    }
                }else{
                    message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.noperms.translate({perms:"ADMINISTRATOR"})))
                }
            }else if(args[0].toLowerCase() == 'buy'){
                if(message.member.roles.cache.has(role.id)){
                    message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.shop.params.param6))
                }else if(message.guild.settings.Economy.shop.has(role.id)){
                    if(message.guild.settings.Economy.shop.get(role.id) > message.member.options.money)return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.nomoney));
                    message.guild.member(message.author).roles.add(role.id)
                    message.member.options.money -= message.guild.settings.Economy.shop.get(role.id);
                    message.channel.send(this.Main.embeds.OKEmbed.setDescription(language.shop.params.param7));
                }else return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.shop.params.param8));
        }

    }else if(!args[0] || !["add","delete","buy"].includes(args[0].toLowerCase())){
        let embed = new Discord.MessageEmbed()
        .setTitle(language.shop.params.param9)
        if(message.guild.settings.Economy.shop.size > 0){
        var text = " "
        var i = 1
        message.guild.settings.Economy.shop.forEach((value, key) => {text += `**${i++}**.${message.guild.roles.cache.get(key)} - ${value}$\n`})
        }else {var text = language.shop.params.param10}
        return message.channel.send(embed.setDescription(text))
        }else return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.shop.params.param11))
    }catch (error) {
    console.log(error.stack)
}
}
}