nodemoon index.js
if(res.Moderation.muteRole = undefined)return;
if(Data.warn >= res.Moderation.Warns.muteWarns){
  message.member.addRole(res.Moderation.muteRole);
  Data._muteTime = Date.now() + 60000*20
  let embed = new Discord.MessageEmbed()
  .setColor(config.color)
  .setDescription(`${message.author.tag} был замучен за частое нарушение.`)
  message.channel.send(embed)
  setTimeout(function(){
   message.member.removeRole(res.Moderation.muteRole);
   message.channel.send(`<${Data.userid}> has been unmuted!`);
 }, ms(Data._muteTime));
  }
