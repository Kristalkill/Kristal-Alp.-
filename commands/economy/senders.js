module.exports = {
    name: 'senders',
    description: 'Напишу потом',
    aliases: ["senders"],
    public: true,
     async execute (Main, message, args,res) {
        try {
            let MarryEmbed = new Discord.MessageEmbed()
            .setColor("#F430FF")
            User.findOne({guildID: message.guild.id, userID:message.author.id},(err,Data) => {
            if (err){console.log(err)}
            if (Data){
                if (Data.senders.length <= 2)return  message.channel.send(embeds.ErrEmbed.setDescription('Вам никто не отправлял предложение'));
                let usersArr = Data.senders.split(',')
                for (let i = 0; i < usersArr.length; i++) {
                                MarryEmbed.addField(`** **`,`**${i + 1}.${Main.users.cache.get(usersArr[i]).tag}**`);
                            }
                MarryEmbed.setDescription('Список предложений:');
                MarryEmbed.setFooter('Для принятия введите accept номер')
                return message.channel.send(MarryEmbed);
                        }
                    })        
        } catch (error) {
            console.log(error.stack) 
        }
    }
}