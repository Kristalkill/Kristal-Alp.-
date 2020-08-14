module.exports = {
    name: 'accept',
    description: 'Напишу потом',
    aliases: ["accept"],
    public: true,
     async execute (Main, message, args,res) {
       try {
        const MarryEmbed = new Discord.MessageEmbed()
        .setColor("#F430FF")
        User.findOne({guildID: message.guild.id, userID:message.author.id},async(err,Data) => {
        if (err){console.log(err)}
        if (Data){
          if (Data.senders.length <= 2)return  message.channel.send(embeds.ErrEmbed.setDescription(`У вас нет предложений`));
          if (!args[1])return  message.channel.send(new Discord.MessageEmbed(), `Укажите число от 1 до ${Data.senders.split(',').length}. Чтобы посмотреть список партнеров введите ${res.Moderation.prefix}senders`);
          let acceptNum = functions.toNum(args[1])
          if (!acceptNum || acceptNum == 0 || acceptNum > Data.senders.split(',').length)return  message.channel.send(`Укажите число от 1 до ${Data.senders.split(',').length}. Чтобы посмотреть список партнеров введите ${res.Moderation.prefix}marry senders`);
          let sendersArr2 = Data.senders.split(',');
          let acceptUser = sendersArr2[acceptNum - 1];
          for (let i = 0; i < sendersArr2.length; i++) {
            let curUser1 =  await User.findOne({userID:sendersArr2[i]});
            curUser1.sended = '0';
            await curUser1.save();
        
          };
                            let marryUser = User.findOne({userID:acceptUser })
                            marryUser.partner = message.author.id
                            marryUser.senders = ''
                            marryUser.save()
                            Data.partner = acceptUser
                            Data.senders = ''
                            Data.save()
                            let sUserz = Main.users.cache.get(acceptUser);
                            MarryEmbed.setTitle(`Вы успешно приняли предложение от ${sUserz.tag}`)
                            return message.channel.send(MarryEmbed);
                            }
        
        })
       } catch (error) {
         console.log(error)
       }}}
