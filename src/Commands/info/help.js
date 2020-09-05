const Command = require('../../Structures/Command');
const Discord = require('discord.js');
const fs = require('fs')
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['help'],
			description: 'help',
			category: 'info'
		});
	}
	async run(message,language,args) {
      try {
        const command = this.Main.commands.get(args[0].toLowerCase()) || this.Main.commands.get(this.Main.aliases.get(args[0].toLowerCase()));
        if(command.public === false ||!command){
          let res = await this.Main.db.Guild.findOne({guildID: message.guild.id})
          let pages1 = [];
          let pages = []; 
          let page = 1 
          fs.readdirSync(`src/Commands/`).filter(module => module != 'development').forEach(module => {
          pages1.push(module.capitalize());
          if(this.Main.commands.filter(cmd => cmd.category == module).size >= 1) return pages.push(`${this.Main.commands.filter(cmd => cmd.category == module).map(cmd => `\`${res.Moderation.prefix}${cmd.name}\` - ${language[cmd.name].command.description}`).join(`\n`)}`)
          })
          const embed = new Discord.MessageEmbed()
          .setColor(0xffffff)
          .setDescription(pages[page-1])
          .setTitle(pages1[page-1])
          .setFooter(`Page ${page} of ${pages.length}`);
        message.channel.send(embed).then(async msg => {
        const reacted =  await this.Main.utils.promptMessage(msg, message.author, 60000, ['⏪','⬅','⏹','➡','⏩'])
        reacted.on('collect', reaction => {
          switch(reaction.emoji.name){
            case '⏪':
              page = 1;
              msg.edit(embed.setDescription(pages[page-1]).setTitle(pages1[page-1]).setFooter(`Page ${page} of ${pages.length}`));
              break;
            case '⬅':
              page == 1 ? page = pages.length : page--
              msg.edit(embed.setDescription(pages[page-1]).setTitle(pages1[page-1]).setFooter(`Page ${page} of ${pages.length}`));
              break;
            case '⏹':
              msg.delete();
              break;
            case '➡':
              page == pages.length ? page = 1 : page++
              msg.edit(embed.setDescription(pages[page-1]).setTitle(pages1[page-1]).setFooter(`Page ${page} of ${pages.length}`));
              break;
            case '⏩':
              page = pages.length;
              msg.edit(embed.setDescription(pages[page-1]).setTitle(pages1[page-1]).setFooter(`Page ${page} of ${pages.length}`));
              break;
          }
          if(message.guild.me.hasPermission('MANAGE_MESSAGES'))return reaction.users.remove(message.author.id)
        })
        })      
        if(message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.delete();
      }else return message.channel.send(new Discord.MessageEmbed().setTitle(command.name).setDescription(language[command.name].param.translate({nsfw:command.nsfw,category:command.category,aliases:command.aliases,usage:language[command.name].command.usage,description:language[command.name].command.description})))
  } catch (error) {
    console.log(error)
  }
  }
}
