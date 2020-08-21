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
        async run(message,args) {
        try {
            const amount = args[0];
            if (isNaN(amount)||1 < amount > 100)return  message.channel.send(this.Main.embeds.ErrEmbed.setDescription(`Введите число от 1 до 100`))
            await message.channel.messages.fetch({ limit: amount }).then(messages => {
                message.channel.bulkDelete(messages)}).then(messages1 =>  message.channel.send(this.Main.embeds.OKEmbed.setDescription(`Удалено ${messages1.size} messages`)))   
        } catch (error) {
            console.log(error)
        }
    }
}