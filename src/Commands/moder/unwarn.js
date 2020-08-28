const Command = require('../../Structures/Command');
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['unwarn'],
            category: 'moder',
            Permission:["KICK_MEMBERS"],
        });
    }
   async run(message,language) {
    try {
      let member = message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first())
      if(!member) return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.nomember))
      if(member.user.id == message.author.id) return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.unwarn.params.para1))
      if(member.user.bot) return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.bot))
      let data = await this.Main.db.User.findOne({guildID: message.guild.id, userID: member.id})
        if(err)return console.log(err);
        if(!data)return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.noData));
          if(data.warn <= 0) return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.unwarn.params.param2))
          data.warn -= 1
          data.save()
          message.channel.send(this.Main.embeds.OKEmbed.setDescription(language.unwarn.params.param2.translate({moder:message.author,member:message.guild.member(message.author).user.tag,warns:`${data.warn}/${Data.warn||0}`})))
    } catch (error) {
      console.log(error)
    }}};
