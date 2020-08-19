const Command = require('../../Structures/Command');
module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: ['block'],
			description: 'block.',
            category: 'development',
            public: false
		});
	}
	run(message,args,language) {
        try {
            const member =  message.guild.member(message.mentions.users.filter(u=>u.id != message.guild.me.id).first())
            const reason = (args.slice(1).join(" ") || language.botinfo.param1)
            if(!member)return message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.botinfo.param2));
            this.Main.db.Block.findOne({id: member.id},(err,Data)=> {
            if(err) return console.log(err);
            if(Data) return message.channel.send(this.embeds.Main.ErrEmbed.setDescription(language.botinfo.param3.translate({member:member,reason:Data.reason})));
            this.Main.db.Block.create({id:member.id,reason:reason});
            message.channel.send(this.Main.embeds.OKEmbed.setDescription(language.botinfo.param4.translate({member:member,reason:reason})));
        })
        } catch (error) {
            console.log(error)
        }}}