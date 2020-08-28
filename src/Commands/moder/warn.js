const Command = require('../../Structures/Command');
module.exports = class extends Command {
  constructor(...args) {
      super(...args, {
          aliases: ['warn'],
          category: 'moder',
          Permission:["KICK_MEMBERS"],
      });
  }
  async run(message,language,args) {
    try {
      let reason = args.slice(1).join(` `)||language.undefined; 
      let member = message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first())
      if(!member) return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.nomember))
      if(member.user.id == message.author.id) return  message.channel.send(language.warn.param1)
      if(member.user.bot) return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.bot))
      let data = await this.Main.db.User.findOne({guildID: message.guild.id, userID: member.id})
      if(data){ 
        data.warn += 1
        data.save()
        message.channel.send(this.Main.embeds.OKEmbed.setDescription(language.unwarn.params.param2.translate({moder:message.author,member:message.guild.member(message.author).user.tag,reason:reason,warns:`${data.warn}/${Data.warn||0}`})))
      }
    } catch (error) {
      console.log(error)
    }}};
