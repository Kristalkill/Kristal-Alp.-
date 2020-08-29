const Command = require('../../Structures/Command');
module.exports = class extends Command {
        constructor(...args) {
            super(...args, {
                aliases: ['clear'],
                category: 'moder',
                Permission:["MANAGE_MESSAGES"],
                PermissionBOT:["MANAGE_MESSAGES"],
            });
        }
        async run(message,language,args) {
        try {
            const amount = args[0];
            if (isNaN(amount)||1 < amount > 100)return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription(language.clear.params.param1))
            const  messages = await message.channel.messages.fetch({ limit: amount })
            message.channel.bulkDelete(messages)
            message.channel.send(this.Main.embeds.OKEmbed.setDescription(language.clear.params.param2.translate({size:messages.size})))  
        } catch (error) {
            console.log(error)
        }
    }
}