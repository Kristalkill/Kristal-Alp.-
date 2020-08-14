module.exports = {
    name: "block",
    description: "block",
    aliases: [],
    public: false,
    async execute(Main, message, args) {
        try {
            const member =  message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first())
            const reason = (args.slice(1).join(" ")||"Неизвесной")
            if(!member)return;
            Block.findOne({id: member.id},(err,Data)=> {
            if(!Data){
            Block.create({id:member.id,reason:reason})
            message.channel.send(embeds.OKEmbed.setDescription(`${member} заблокирован по причине **${reason.toLowerCase()}**`));
            }
            else return message.channel.send(embeds.ErrEmbed.setDescription(`${member} уже заблокирован по причине ${Data.reason}`))
        })
        } catch (error) {
            console.log(error)
        }}}