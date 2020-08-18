const Command = require('../../Structures/Command');
const Discord = require('discord.js')
const fs = require('fs')
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['help'],
			description: 'help',
			category: 'infa'
		});
	}
	async run(message) {
      try {
        this.Main.db.Guild.findOne({guildID: message.guild.id},(err,res) => {
          if(err)return console.log(err);
        let pages = []; 
        let page = 1 
        fs.readdirSync(`src/Commands/`).filter(module => module != 'development').forEach(module => 
          {if(this.Main.commands.filter(cmd => cmd.category == module).size >= 1) return pages.push(`${this.Main.commands.filter(cmd => cmd.category == module).map(cmd => `\`${res.Moderation.prefix}${cmd.name}\` - ${cmd.description}`).join(`\n`)}`)})
        const embed = new Discord.MessageEmbed()
        .setColor(0xffffff)
        .setFooter(`Page ${page} of ${pages.length}`)
        .setDescription(pages[page-1])
      message.channel.send(embed).then(async msg => {
      await msg.react('⏪');
      await msg.react('⬅');
      await msg.react('⏹');
      await msg.react('➡');
      await msg.react('⏩');
      const filter = (reaction, user) => ['⏪','⬅','⏹','➡','⏩'].includes(reaction.emoji.name) && user.id === message.author.id;
      const Reaction = msg.createReactionCollector(filter,{timer:6000})
      Reaction.on('collect', reaction => {
        switch(reaction.emoji.name){
          case '⏪':
            page = 1;
            msg.edit(embed.setDescription(pages[page-1]).setFooter(`Page ${page} of ${pages.length}`));
            break;
          case '⬅':
            page == 1 ? page = pages.length : page--
            msg.edit(embed.setDescription(pages[page-1]).setFooter(`Page ${page} of ${pages.length}`));
            break;
          case '⏹':
            msg.delete();
            break;
          case '➡':
            page == pages.length ? page = 1 : page++
            msg.edit(embed.setDescription(pages[page-1]).setFooter(`Page ${page} of ${pages.length}`));
            break;
          case '⏩':
            page = pages.length;
            msg.edit(embed.setDescription(pages[page-1]).setFooter(`Page ${page} of ${pages.length}`));
            break;
        }
        if(message.guild.me.hasPermission('MANAGE_MESSAGES'))return reaction.users.remove(message.author.id)
      })
      })      
      if(message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.delete();
    })
  } catch (error) {
    console.log(error)
  }
  }
}
