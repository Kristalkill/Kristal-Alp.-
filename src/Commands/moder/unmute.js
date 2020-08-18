const Command = require('../../Structures/Command');
module.exports = class extends Command {
      constructor(...args) {
          super(...args, {
              aliases: ['unmute'],
              description: 'unmute',
              category: 'moder',
              Permission:["MANAGE_CHANNELS"],
              PermissionBOT:["MANAGE_CHANNELS","MANAGE_ROLES"],
          });
      }
      run(message,args) {
      try {
        this.Main.db.Guild.findOne({guildID: message.guild.id},async(err,res) => {
          if(err) return console.log(err);
          let muterole = (res.Moderation.muterole.id ||message.guild.roles.cache.find(x => /(В)?[Mм][uyу][t(ьт)]([eеd])?/gi.test(x.name)).id);
          let member = message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first()||message.guild.members.get(args[0]))
          if(member.roles.cache.has(muterole)){

            this.Main.db.Mute.findOne({guildID:message.guild.id,id:member.id},async(err,data) => {
            if(err) return console.log(err)
            if(data) return  this.Main.db.Mute.deleteOne({guildID:message.guild.id,id:member.id})
            })
            await member.roles.remove(muterole);
            message.channel.send(embeds.OKEmbed.setDescription(`${member} розмучен!`));
          }
          })
      } catch (error) {
        console.log(error)
      }}}