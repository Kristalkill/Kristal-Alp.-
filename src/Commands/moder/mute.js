const humanizeDuration = require('humanize-duration')
const ms = require('ms')
module.exports = class extends Command {
      constructor(...args) {
          super(...args, {
              aliases: ['mute'],
              description: 'mute',
              category: 'moder',
              Permission:["MANAGE_CHANNELS"],
              PermissionBOT:["MANAGE_CHANNELS","MANAGE_ROLES"],
          });
      }
      async run(message,args) {
      try {
        this.Main.db.Guild.findOne({guildID: message.guild.id},(err,res) => {
          if(err) return console.log(err);
          let member = message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first()||message.guild.members.get(args[0]))
          if(!member)return;
          let muterole = message.guild.roles.cache.find(x => /(В)?[Mм][uyу][t(ьт)]([eеd])?/gi.test(x.name)) 
          if(!message.guild.roles.cache.get(res.Moderation.muterole)){
            if(muterole){
              res.Moderation.muterole = muterole.id;
            }
          else{
            try{
              muterole = message.guild.roles.create({
                name: "Muted",
                color: "#000000",
                permissions:[]
              })
              message.guild.channels.forEach(async (channel) => {
                await channel.overwritePermissions(muterole, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false
                });
              });
              res.Moderation.muterole = muterole.id;
            }catch(e){
              console.log(e.stack);
            } 
          }
          res.Moderation.muterole = muterole.id;
          res.save();
          }
          if(args[1] && parseInt(args[2])){
          this.Main.db.Mute.findOne({guildID:message.guild.id,id:member.id},async(err,res1) => {
          if(err)return console.log(err);
          if(!res1){ 
            this.Main.db.Mute.create({guildID:message.guild.id,id:member.id,reason:args[1],time:parseInt(Date.now()) + ms(args[2]),channel:message.channel.id});
            await member.roles.add(muterole.id);
             message.channel.send(`${member} замучен на  ${humanizeDuration(ms(args[2]),{round: true,language: "ru"})}`);}
          if(res1)return message.channel.send(`${member} ещё замучен на ${humanizeDuration(ms(res1.time - Date.now()))}`);})}
          else return  message.channel.send(`Использывание команды ${res.Moderation.prefix}mute @user/userid причина время `)}) 
      } catch (error) {
        console.log(error)
      }}}