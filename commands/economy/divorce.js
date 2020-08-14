const MarryEmbed = new Discord.MessageEmbed()
module.exports = {
    name: 'divorce',
    description: 'Напишу потом',
    aliases: ["нахуй"],
    public: true,
     async execute (Main, message, args,res) {
         try {
            User.findOne({guildID: message.guild.id, userID:message.author.id},(err,Data) => {
                if ((Data.partner||Data1.partner) == '0')return  message.channel.send(embeds.ErrEmbed.setDescription('У тебя нету партнера'));
                let activePartner = User.findOne({ userID:Data.partner });
                activePartner.partner = '0';
                activePartner.save();
                Data.partner = '0';
                Data.save();
                MarryEmbed.setTitle('Как жаль но вы развелись с своим партнером! Будем надеятся вы найдете себе лучше');
                return message.channel.send(MarryEmbed);
                })   
         } catch (error) {
             console.log(error.stack)
         }
}}