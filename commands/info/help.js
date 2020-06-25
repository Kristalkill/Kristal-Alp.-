module.exports = {
    name: "help",
    description: "Команда позволяющая узнать описание других, не круто ли?",
    aliases: ["h"],
    public: true,
    async execute(Main, message, args,res) {
      let memberp = message.guild.me.hasPermission('MANAGE_MESSAGES')
          let member =  message.guild.member(message.author)
      function commandes(categoryName) {
          return `${Main.commands.filter(cmd => cmd.category == categoryName).map(cmd => `\`${res.Moderation.prefix}${cmd.name}\` - ${cmd.description}`).join(`\n`)}`
      }
      let page = 1;
      let Page1 = new Discord.MessageEmbed()
      .setTitle("Economy")
      .setDescription(commandes('economy'))
      let Page2 = new Discord.MessageEmbed()
      .setTitle("Fun")
      .setDescription(commandes('fun'))
      let Page3 = new Discord.MessageEmbed()
      .setTitle("Info")
      .setDescription(commandes('info'))
      let Page4 = new Discord.MessageEmbed()
      .setTitle("Music")
      .setDescription(commandes("music"))
      let Page5 = new Discord.MessageEmbed()
      .setTitle("Moder")
      .setDescription(commandes('moder'))
      let Page6 = new Discord.MessageEmbed()
      .setTitle("NTFS")
      .setDescription(commandes('NTFS'))
      let Page7 = new Discord.MessageEmbed()
      .setTitle("Setting")
      .setDescription(commandes("setting"))
      let pages = [Page1,Page2,Page3,Page4,Page5,Page6,Page7];
      if(memberp){
        message.delete();
       }
      message.channel.send(Page1.setFooter(`Страница ${page} из ${pages.length}`)).then(msg => {
      msg.react('⏪').then( r => {
      msg.react('⬅').then( r => {
      msg.react('⏹').then( r => {
      msg.react('➡').then( r => {
      msg.react('⏩')
      const rewindF  = (reaction, user) => reaction.emoji.name === '⏪' && user.id === message.author.id;
      const backwardF = (reaction, user) => reaction.emoji.name === '⬅' && user.id === message.author.id;
      const stopF = (reaction, user) => reaction.emoji.name === '⏹' && user.id === message.author.id;
      const forwardF = (reaction, user) => reaction.emoji.name === '➡' && user.id === message.author.id;
      const forward_fastF  = (reaction, user) => reaction.emoji.name === '⏩' && user.id === message.author.id;
      const rewind = msg.createReactionCollector(rewindF, {timer: 6000});
      const backward = msg.createReactionCollector(backwardF, {timer: 6000});
      const stop = msg.createReactionCollector(stopF, {timer: 6000});
      const forward = msg.createReactionCollector(forwardF, {timer: 6000});
      const forward_fast = msg.createReactionCollector(forward_fastF, {timer: 6000});
      backward.on('collect', r => {
      if (page == 1) {
        page = pages.length
        msg.edit(pages[page-1].setFooter(`Страница ${page} из ${pages.length}`));
        if(memberp){
         r.users.remove(message.author.id)
       }
      }
      else{
        page--;
        msg.edit(pages[page-1].setFooter(`Страница ${page} из ${pages.length}`));
       if(memberp){
        r.users.remove(message.author.id)
      }
    }
      })
    forward.on('collect', r => {
      if (page == pages.length) {
        page = 1
        msg.edit(pages[page-1].setFooter(`Страница ${page} из ${pages.length}`));
        if(memberp){
         r.users.remove(message.author.id)
       }
      }
      else{
        page++;
        msg.edit(pages[page-1].setFooter(`Страница ${page} из ${pages.length}`));
       if(memberp){
        r.users.remove(message.author.id)
      }
    }
      })
      stop.on('collect', r => {
      msg.delete();
    })
    rewind.on('collect', r => {
      page = 1;
      msg.edit(pages[page-1].setFooter(`Страница ${page} из ${pages.length}`));
      if(message.guild.me.hasPermission('MANAGE_MESSAGES')){
        r.users.remove(message.author.id)
      }
    })
    forward_fast.on('collect', r => {
       page = pages.length;
       msg.edit(pages[page-1].setFooter(`Страница ${page} из ${pages.length}`));
      if(message.guild.me.hasPermission('MANAGE_MESSAGES')){
        r.users.remove(message.author.id)
      }
    })
    })
      })
      })
      })
      })
      }
    }
