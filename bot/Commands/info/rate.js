const Command = require('../../Structures/Construction/Command');
const {MessageEmbed} = require("discord.js");
module.exports = class extends Command {
    constructor(...args) {
        super(...args, {});
    }

    async run(message, args) {
        let ratings = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣']
        let text = args.toString()
        console.log(text)
        if (!text) {
            return message.channel.send(new MessageEmbed().setTitle('Provide reason'))
        }
        message.channel.send(new MessageEmbed().setTitle('Rate').setDescription('rate from 1-5 ⭐')).then(async msg => {
            let data = await this.Main.db.Global_Users;
            let user = await data.findOne({UserID: message.author.id});
            let rate_collector = await this.Main.utils.Reaction_Collector(await this.Main.utils.reaction(ratings, msg, true), msg, message.author, 60000)
            msg.delete({
                timeout: 60000
            });
            rate_collector.on('collect', (reaction) => {
                let name = ratings.indexOf(reaction.emoji.name) + 1
                if (user) {
                    user.Rate.rating = name
                    user.Rate.reason = text
                    user.save()
                    msg.channel.send(new MessageEmbed().setTitle(`You successful edit rate bot on ${name} by reason ${text}`)).then(m => {
                        m.delete({
                            timeout: 10000
                        });
                    })
                } else {
                    data.create({
                        UserID: message.author.id,
                        Rate: {
                            rating: name,
                            reason: text
                        },
                        Badges: [null]
                    })
                    msg.channel.send(new MessageEmbed().setTitle(`You successful rated bot on ${name} by reason ${text}`)).then(m => {
                        m.delete({
                            timeout: 10000
                        });
                    })
                }
            })
        })
    }
}