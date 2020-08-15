const Command = require('../../Structures/Command');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['block'],
			description: 'Displays information about the bot.',
			category: 'development'
		});
	}
	run(message,args) {
        try {
            const member =  message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first())
            const reason = (args.slice(1).join(" ")||"Неизвесной")
            if(!member)return;
            this.Main.db.Block.findOne({id: member.id},(err,Data)=> {
            if(Data){
                message.channel.send(this.embeds.ErrEmbed.setDescription(`${member} уже заблокирован по причине ${Data.reason}`))
            }
            else{
            this.Main.db.Block.create({id:member.id,reason:reason})
            message.channel.send(this.embeds.OKEmbed.setDescription(`${member} заблокирован по причине **${reason.toLowerCase()}**`));
            }
        })
        } catch (error) {
            console.log(error)
        }}}